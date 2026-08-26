"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface APSViewerProps {
  urn: string;
}

declare global {
  interface Window {
    Autodesk: typeof Autodesk;
  }
}

declare namespace Autodesk {
  namespace Viewing {
    function Initializer(
      options: { accessToken: string; env: string; api: string },
      callback: () => void
    ): void;
    class GuiViewer3D {
      constructor(container: HTMLElement, config?: object);
      start(): number;
      finish(): void;
      loadDocumentNode(
        doc: Document,
        node: BubbleNode,
        options?: object
      ): Promise<void>;
    }
    class Document {
      static load(
        urn: string,
        onSuccess: (doc: Document) => void,
        onError?: (code: number, msg: string) => void
      ): void;
      getRoot(): BubbleNode;
    }
    class BubbleNode {
      getDefaultGeometry(): BubbleNode;
    }
  }
}

export default function APSViewer({ urn }: APSViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Autodesk.Viewing.GuiViewer3D | null>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scriptCountRef = useRef(0);

  const handleScriptLoad = () => {
    scriptCountRef.current += 1;
    // We load 2 scripts: viewer3D.js and style.css (css loads via link, not counted)
    if (scriptCountRef.current >= 1) {
      setScriptsLoaded(true);
    }
  };

  useEffect(() => {
    if (!scriptsLoaded || !containerRef.current || !urn) return;

    const initViewer = async () => {
      try {
        // Fetch token from our API route
        const tokenRes = await fetch("/api/aps/token");
        if (!tokenRes.ok) {
          throw new Error("Failed to get access token");
        }
        const { access_token } = await tokenRes.json();

        // Initialize Autodesk Viewer
        window.Autodesk.Viewing.Initializer(
          {
            accessToken: access_token,
            env: "AutodeskProduction2",
            api: "streamingV2",
          },
          () => {
            if (!containerRef.current) return;

            const viewer = new window.Autodesk.Viewing.GuiViewer3D(
              containerRef.current,
              {
                extensions: ["Autodesk.DocumentBrowser"],
              }
            );
            viewer.start();
            viewerRef.current = viewer;

            // Load the document
            window.Autodesk.Viewing.Document.load(
              `urn:${urn}`,
              (doc) => {
                const viewables = doc.getRoot().getDefaultGeometry();
                viewer.loadDocumentNode(doc, viewables);
                setLoading(false);
              },
              (code, msg) => {
                console.error("Document load error:", code, msg);
                setError(`Failed to load 3D model (Error ${code})`);
                setLoading(false);
              }
            );
          }
        );
      } catch (err) {
        console.error("Viewer init error:", err);
        setError("Failed to initialize 3D viewer");
        setLoading(false);
      }
    };

    initViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.finish();
        viewerRef.current = null;
      }
    };
  }, [scriptsLoaded, urn]);

  return (
    <>
      {/* Load Autodesk Viewer scripts */}
      <link
        rel="stylesheet"
        href="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css"
      />
      <Script
        src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js"
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />

      <div className="relative w-full rounded-xl border border-border overflow-hidden bg-bg-card">
        {/* Viewer container */}
        <div
          ref={containerRef}
          style={{ width: "100%", height: "500px" }}
        />

        {/* Loading overlay */}
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-card/80">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-text-secondary">
                Loading 3D Model...
              </span>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-card">
            <div className="flex flex-col items-center gap-3 text-center px-4">
              <span className="text-3xl">⚠️</span>
              <span className="text-sm text-text-secondary">{error}</span>
              <span className="text-xs text-text-muted">
                The 3D model may still be processing. Please try again later.
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
