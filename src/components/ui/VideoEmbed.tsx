"use client";

interface VideoEmbedProps {
  url: string;
  title?: string;
}

export default function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  // Detect video type
  const isYouTube =
    url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  if (isYouTube || isVimeo) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl border border-border" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  // HTML5 video for MP4
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border" style={{ paddingBottom: "56.25%" }}>
      <video
        src={url}
        title={title}
        controls
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
