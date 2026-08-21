"use client";

import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

const ModelViewerCanvas = lazy(() => import("./ModelViewerCanvas"));

interface ModelViewerProps {
  url: string;
  format: "glb" | "stl";
}

export default function ModelViewer({ url, format }: ModelViewerProps) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-xl border border-border bg-bg-card overflow-hidden">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={32} className="text-accent animate-spin" />
            <span className="ml-3 text-text-secondary text-sm">
              Loading 3D Model...
            </span>
          </div>
        }
      >
        <ModelViewerCanvas url={url} format={format} />
      </Suspense>
      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg glass text-xs text-text-secondary">
        Drag to rotate • Scroll to zoom • Right-click to pan
      </div>
    </div>
  );
}
