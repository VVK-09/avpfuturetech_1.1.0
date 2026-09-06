import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#092244",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "AVP FutureTech | AI, IoT & Robotics Education for Rural India",
    template: "%s | AVP FutureTech",
  },
  description:
    "Empowering school students (Grades 1–10) and college innovators across rural India with world-class hands-on education in AI, IoT, Robotics, Automation, and STEM.",
  keywords: [
    "AVP FutureTech",
    "EdTech India",
    "Robotics Workshops Sindhudurg",
    "AI Education Schools",
    "IoT STEM Labs",
    "Atal Tinkering Lab Setup",
    "Rural Innovation",
    "Grades 1-10 Robotics",
    "Hands-on STEM Kits",
  ],
  authors: [{ name: "AVP FutureTech Team" }],
  metadataBase: new URL("https://www.avpfuturetech.com"),
  openGraph: {
    title: "AVP FutureTech — Learn. Innovate. Transform.",
    description:
      "Bridging the opportunity gap: Bringing metro-grade AI, IoT & Robotics learning to rural India.",
    url: "https://www.avpfuturetech.com",
    siteName: "AVP FutureTech",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero_robotics_ai.jpg",
        width: 1200,
        height: 630,
        alt: "AVP FutureTech Hands-on Robotics & AI Education",
      },
    ],
  },
  icons: {
    icon: "/logos/logo.png",
    apple: "/logos/logo.png",
  },
};

import ConditionalLayout from "@/components/ConditionalLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} font-sans scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#3C4658] antialiased selection:bg-[#1E63D6]/20 selection:text-[#0B1E3D]">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
