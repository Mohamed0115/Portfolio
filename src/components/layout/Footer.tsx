"use client";

import Link from "next/link";
import { Mail, Heart } from "lucide-react";
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from "@/components/ui/SocialIcons";
import { personalInfo } from "@/data/personal";

const socialLinks = [
  { href: personalInfo.social.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
  { href: personalInfo.social.github, icon: GitHubIcon, label: "GitHub" },
  { href: personalInfo.social.youtube, icon: YouTubeIcon, label: "YouTube" },
  { href: personalInfo.social.email, icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold font-[family-name:var(--font-poppins)] text-text-primary"
            >
              <span className="text-gradient">&lt;</span>
              {personalInfo.name.split(" ")[0]}
              <span className="text-gradient">/&gt;</span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary max-w-xs">
              {personalInfo.title} — bridging mechanical systems and intelligent
              software.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projects" },
                { href: "/lectures", label: "Lectures" },
                { href: "/#contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-bg-card text-text-secondary hover:text-accent hover:bg-accent-subtle border border-border hover:border-accent transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1">
            Built with <Heart size={12} className="text-accent" /> using Next.js
            & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
