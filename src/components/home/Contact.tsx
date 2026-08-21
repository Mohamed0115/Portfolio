"use client";

import { useState } from "react";
import { Mail, Send, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from "@/components/ui/SocialIcons";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { personalInfo } from "@/data/personal";

const socialLinks = [
  {
    href: personalInfo.social.linkedin,
    icon: LinkedInIcon,
    label: "LinkedIn",
    color: "#0A66C2",
  },
  {
    href: personalInfo.social.github,
    icon: GitHubIcon,
    label: "GitHub",
    color: "#333",
  },
  {
    href: personalInfo.social.youtube,
    icon: YouTubeIcon,
    label: "YouTube",
    color: "#FF0000",
  },
  {
    href: personalInfo.social.email,
    icon: Mail,
    label: "Email",
    color: "var(--accent-primary)",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens default email client with form data
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <SectionWrapper id="contact" className="bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary"
          >
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="mt-3 text-text-secondary max-w-lg mx-auto">
            Have a project in mind or want to discuss an opportunity? I&apos;d love to
            hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-text-secondary mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-text-secondary mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-subject"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none"
                placeholder="Project collaboration"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-all shadow-lg hover:shadow-xl w-full justify-center"
            >
              Send Message
              <Send
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-bg-card border border-border">
              <h3 className="text-lg font-semibold text-text-primary font-[family-name:var(--font-poppins)] mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent-subtle">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Email</p>
                    <a
                      href={personalInfo.social.email}
                      className="text-sm text-text-primary hover:text-accent transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent-subtle">
                    <MapPin size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Location</p>
                    <p className="text-sm text-text-primary">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-xl bg-bg-card border border-border">
              <h3 className="text-lg font-semibold text-text-primary font-[family-name:var(--font-poppins)] mb-4">
                Find Me Online
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent hover:bg-accent-subtle transition-all group"
                  >
                    <social.icon
                      size={20}
                      className="text-text-secondary group-hover:text-accent transition-colors"
                    />
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
