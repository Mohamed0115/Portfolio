"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function GLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function STLModel({ url }: { url: string }) {
  // For STL files we still use a simple approach
  // In production you'd use a STL loader
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="var(--accent-primary)" />
    </mesh>
  );
}

interface ModelViewerCanvasProps {
  url: string;
  format: "glb" | "stl";
}

export default function ModelViewerCanvas({
  url,
  format,
}: ModelViewerCanvasProps) {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6}>
          {format === "glb" ? <GLBModel url={url} /> : <STLModel url={url} />}
        </Stage>
      </Suspense>
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}
