import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import SectionNav from "@/components/home/SectionNav";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mohamed Ali Hamed | Robotics & Mechatronics Engineer",
    template: "%s | Mohamed Ali Hamed",
  },
  description:
    "Portfolio of Mohamed Ali Hamed — Robotics & Mechatronics Engineer specializing in IIoT, Mechanical Design, ROS 2, and Smart Automation. Cairo University.",
  keywords: [
    "Robotics Engineer",
    "Mechatronics",
    "IIoT",
    "Mechanical Design",
    "ROS 2",
    "SolidWorks",
    "Cairo University",
    "Mohamed Ali Hamed",
  ],
  authors: [{ name: "Mohamed Ali Hamed" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mohamed Ali Hamed | Robotics & Mechatronics Engineer",
    description:
      "Portfolio showcasing robotics, mechanical design, and IoT projects.",
    siteName: "Mohamed Ali Hamed Portfolio",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "zVkzRuVU9z6YM2s9xnCB1I7iu0zyU6bWLEmwVFED5TY",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} dark`}
      data-color-scheme="blue"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('portfolio-theme') || 'dark';
                var scheme = localStorage.getItem('portfolio-color-scheme') || 'blue';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                document.documentElement.setAttribute('data-color-scheme', scheme);
              })();
            `,
          }}
        />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <SectionNav />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
