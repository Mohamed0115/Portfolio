"use client";

/**
 * Engineering-identity logo: "Mohamed" with engineering symbols
 * Left: Clean gear icon (Mechanical Design)
 * Right: Solid robot head (Robotics/Mechatronics)
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`group inline-flex items-center gap-1.5 font-bold font-[family-name:var(--font-poppins)] ${className}`}
    >
      {/* Left: Clean Gear (Mechanical Design) */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Gear teeth outer path */}
        <path
          d="M14.5 3h3l.5 3.1a10 10 0 013.2 1.8l2.9-1.3 1.5 2.6-2.4 2a10 10 0 010 3.6l2.4 2-1.5 2.6-2.9-1.3a10 10 0 01-3.2 1.8L17.5 23h-3l-.5-3.1a10 10 0 01-3.2-1.8l-2.9 1.3-1.5-2.6 2.4-2a10 10 0 010-3.6l-2.4-2 1.5-2.6 2.9 1.3A10 10 0 0114 6.1L14.5 3z"
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Gear center circle */}
        <circle
          cx="16"
          cy="13"
          r="4"
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth="1.8"
        />
        {/* Inner dot */}
        <circle cx="16" cy="13" r="1.5" fill="var(--accent-primary)" />
      </svg>

      {/* Main text — hover changes to accent color */}
      <span className="text-text-primary text-lg md:text-xl tracking-tight group-hover:text-accent transition-colors">
        Mohamed
      </span>

      {/* Right: Robot Head (Robotics/Mechatronics) */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Antenna */}
        <line x1="16" y1="3" x2="16" y2="7" stroke="var(--accent-primary)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16" cy="2.5" r="1.8" fill="var(--accent-primary)" />
        {/* Head body (rounded rectangle) */}
        <rect
          x="6"
          y="7"
          width="20"
          height="16"
          rx="4"
          fill="var(--accent-primary)"
          opacity="0.9"
        />
        {/* Eyes */}
        <rect x="10" y="12" width="4" height="4" rx="1.2" fill="var(--bg-primary, #0a192f)" />
        <rect x="18" y="12" width="4" height="4" rx="1.2" fill="var(--bg-primary, #0a192f)" />
        {/* Eye glow dots */}
        <circle cx="12" cy="14" r="1" fill="var(--accent-primary)" opacity="0.6" />
        <circle cx="20" cy="14" r="1" fill="var(--accent-primary)" opacity="0.6" />
        {/* Mouth (small horizontal line) */}
        <rect x="12" y="19" width="8" height="1.5" rx="0.75" fill="var(--bg-primary, #0a192f)" opacity="0.7" />
        {/* Ears / side panels */}
        <rect x="3" y="12" width="3" height="6" rx="1.5" fill="var(--accent-primary)" opacity="0.7" />
        <rect x="26" y="12" width="3" height="6" rx="1.5" fill="var(--accent-primary)" opacity="0.7" />
        {/* Neck */}
        <rect x="13" y="23" width="6" height="3" rx="1" fill="var(--accent-primary)" opacity="0.75" />
        {/* Shoulders base */}
        <rect x="9" y="26" width="14" height="3" rx="1.5" fill="var(--accent-primary)" opacity="0.6" />
      </svg>
    </span>
  );
}
