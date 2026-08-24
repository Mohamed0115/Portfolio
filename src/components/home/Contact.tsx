"use client";

import { useState } from "react";
import { Mail, Send, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from "@/components/ui/SocialIcons";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { personalInfo } from "@/data/personal";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

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

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        // Auto-reset after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
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
                  disabled={status === "loading"}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none disabled:opacity-50"
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
                  disabled={status === "loading"}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none disabled:opacity-50"
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
                disabled={status === "loading"}
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none disabled:opacity-50"
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
                disabled={status === "loading"}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none resize-none disabled:opacity-50"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button with States */}
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`group flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-lg w-full justify-center ${
                status === "success"
                  ? "bg-green-600 text-white cursor-default"
                  : status === "error"
                  ? "bg-red-500/90 text-white hover:bg-red-600"
                  : "bg-accent text-white hover:bg-accent-hover hover:shadow-xl"
              } disabled:opacity-70`}
            >
              <AnimatePresence mode="wait">
                {status === "loading" && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </motion.span>
                )}
                {status === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    Message Sent Successfully!
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <AlertCircle size={18} />
                    Try Again
                  </motion.span>
                )}
                {status === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Send Message
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Error Message */}
            <AnimatePresence>
              {status === "error" && errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-red-400 text-center"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            {/* API Key Warning (dev only) */}
            {!WEB3FORMS_KEY && (
              <p className="text-xs text-amber-400/80 text-center">
                ⚠ Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local to enable form submission.
              </p>
            )}
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
