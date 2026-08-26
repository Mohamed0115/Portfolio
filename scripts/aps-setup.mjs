/**
 * APS Setup Script — Upload & Translate SolidWorks files
 * 
 * Usage: node scripts/aps-setup.mjs <path-to-zip-file> [root-filename]
 * 
 * Example:
 *   node scripts/aps-setup.mjs "./Robotic Arm for Automotive Assembly/Shared one.zip" "Assembly.SLDASM"
 * 
 * This script:
 * 1. Gets an OAuth token
 * 2. Creates an OSS bucket (if needed)
 * 3. Uploads the ZIP file
 * 4. Triggers SVF2 translation
 * 5. Polls until translation completes
 * 6. Outputs the URN to use in the viewer
 */

const APS_CLIENT_ID = "KaQjHBbSXPyMRjv4aK3NUQ4Uo61BGsJUYbiDI24C7ABh2oYq";
const APS_CLIENT_SECRET = "ZsLo11Z7rvxwwSZhhaJAaMAUGuQpPKpQUWsajBGIp7vCsgenmkuSmva9Psl9RJC9";
const BUCKET_KEY = "mohamed-portfolio-models";

import fs from "fs";
import path from "path";

const BASE_URL = "https://developer.api.autodesk.com";

async function getToken() {
  console.log("🔑 Getting access token...");
  const res = await fetch(`${BASE_URL}/authentication/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: APS_CLIENT_ID,
      client_secret: APS_CLIENT_SECRET,
      grant_type: "client_credentials",
      scope: "data:read data:write data:create bucket:create bucket:read",
    }),
  });
  if (!res.ok) throw new Error(`Auth failed: ${await res.text()}`);
  const data = await res.json();
  console.log("✅ Token acquired");
  return data.access_token;
}

async function createBucket(token) {
  console.log(`📦 Creating bucket: ${BUCKET_KEY}...`);
  const res = await fetch(`${BASE_URL}/oss/v2/buckets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-ads-region": "US",
    },
    body: JSON.stringify({
      bucketKey: BUCKET_KEY,
      policyKey: "persistent",
    }),
  });

  if (res.status === 409) {
    console.log("✅ Bucket already exists");
    return;
  }
  if (!res.ok) throw new Error(`Bucket creation failed: ${await res.text()}`);
  console.log("✅ Bucket created");
}

async function uploadFile(token, filePath) {
  const fileName = path.basename(filePath);
  const fileSize = fs.statSync(filePath).size;
  console.log(`📤 Uploading ${fileName} (${(fileSize / 1024 / 1024).toFixed(1)} MB)...`);

  // Step 1: Get signed upload URL
  const signedRes = await fetch(
    `${BASE_URL}/oss/v2/buckets/${BUCKET_KEY}/objects/${encodeURIComponent(fileName)}/signeds3upload?minutesExpiration=30`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!signedRes.ok) throw new Error(`Signed URL failed: ${await signedRes.text()}`);
  const signedData = await signedRes.json();

  // Step 2: Upload to signed URL
  const fileBuffer = fs.readFileSync(filePath);
  const uploadRes = await fetch(signedData.urls[0], {
    method: "PUT",
    body: fileBuffer,
  });
  if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.status}`);
  console.log("✅ File uploaded to S3");

  // Step 3: Finalize
  const finalRes = await fetch(
    `${BASE_URL}/oss/v2/buckets/${BUCKET_KEY}/objects/${encodeURIComponent(fileName)}/signeds3upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uploadKey: signedData.uploadKey }),
    }
  );
  if (!finalRes.ok) throw new Error(`Finalize failed: ${await finalRes.text()}`);
  const finalData = await finalRes.json();
  console.log("✅ Upload finalized");

  // Return the objectId which we'll use as URN
  return finalData.objectId;
}

function toBase64Urn(objectId) {
  return Buffer.from(objectId).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function translateToSVF2(token, urn, rootFilename) {
  console.log(`🔄 Translating to SVF2...`);

  const input = { urn };
  if (rootFilename) {
    input.compressedUrn = true;
    input.rootFilename = rootFilename;
  }

  const res = await fetch(`${BASE_URL}/modelderivative/v2/designdata/job`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-ads-force": "true",
    },
    body: JSON.stringify({
      input,
      output: {
        formats: [{ type: "svf2", views: ["2d", "3d"] }],
      },
    }),
  });
  if (!res.ok) throw new Error(`Translation failed: ${await res.text()}`);
  console.log("✅ Translation job submitted");
}

async function pollManifest(token, urn) {
  console.log("⏳ Waiting for translation to complete...");
  let status = "pending";
  while (status !== "success" && status !== "failed") {
    await new Promise((r) => setTimeout(r, 10000)); // Wait 10s between polls

    const res = await fetch(
      `${BASE_URL}/modelderivative/v2/designdata/${urn}/manifest`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    status = data.status;
    const progress = data.progress || "unknown";
    console.log(`   Status: ${status} | Progress: ${progress}`);
  }
  return status;
}

// Main execution
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log("Usage: node scripts/aps-setup.mjs <zip-file-path> [root-filename]");
  console.log('Example: node scripts/aps-setup.mjs "./model.zip" "Assembly.SLDASM"');
  process.exit(1);
}

const filePath = args[0];
const rootFilename = args[1] || null;

if (!fs.existsSync(filePath)) {
  console.error(`❌ File not found: ${filePath}`);
  process.exit(1);
}

try {
  const token = await getToken();
  await createBucket(token);
  const objectId = await uploadFile(token, filePath);
  const urn = toBase64Urn(objectId);

  console.log("\n📋 URN (Base64):", urn);

  await translateToSVF2(token, urn, rootFilename);
  const finalStatus = await pollManifest(token, urn);

  if (finalStatus === "success") {
    console.log("\n🎉 Translation complete!");
    console.log("═══════════════════════════════════════════");
    console.log("URN to use in your project data:");
    console.log(urn);
    console.log("═══════════════════════════════════════════");
    console.log("\nAdd this URN to your project in projects.ts:");
    console.log(`  apsModelUrn: "${urn}",`);
  } else {
    console.error("❌ Translation failed.");
  }
} catch (err) {
  console.error("❌ Error:", err.message);
  process.exit(1);
}
