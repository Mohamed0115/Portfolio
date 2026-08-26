import { NextResponse } from "next/server";

// Cache the token in memory to avoid hitting APS on every request
let cachedToken: { access_token: string; expires_at: number } | null = null;

export async function GET() {
  const clientId = process.env.APS_CLIENT_ID;
  const clientSecret = process.env.APS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "APS credentials not configured" },
      { status: 500 }
    );
  }

  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < cachedToken.expires_at - 60000) {
    return NextResponse.json({ access_token: cachedToken.access_token });
  }

  try {
    const response = await fetch(
      "https://developer.api.autodesk.com/authentication/v2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
          scope: "data:read bucket:read",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("APS auth error:", error);
      return NextResponse.json(
        { error: "Failed to authenticate with APS" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Cache the token
    cachedToken = {
      access_token: data.access_token,
      expires_at: Date.now() + data.expires_in * 1000,
    };

    return NextResponse.json({ access_token: data.access_token });
  } catch (err) {
    console.error("APS token error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
