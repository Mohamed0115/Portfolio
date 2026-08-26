"use client";

interface VideoEmbedProps {
  url: string;
  title?: string;
}

function getEmbedUrl(url: string): string {
  // YouTube Shorts: youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;

  // YouTube watch: youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  // YouTube short URL: youtu.be/VIDEO_ID
  const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortUrlMatch) return `https://www.youtube.com/embed/${shortUrlMatch[1]}`;

  // Vimeo: vimeo.com/VIDEO_ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  // Already an embed URL or unknown
  return url;
}

export default function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  const isYouTube =
    url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  if (isYouTube || isVimeo) {
    const embedUrl = getEmbedUrl(url);
    return (
      <div className="relative w-full overflow-hidden rounded-xl border border-border" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embedUrl}
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
