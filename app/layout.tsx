import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleOAuthWrapper from "@/components/auth/GoogleOAuthWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SRI — Advanced AI & Web 4.0 Solutions",
  description:
    "Sri Saketha Rama Technologies — Pioneering advanced AI and Web 4.0 solutions that transform businesses and redefine the digital landscape.",
  keywords: [
    "AI solutions",
    "Web 4.0",
    "blockchain development",
    "digital transformation",
    "Sri Saketha Rama",
    "machine learning",
    "cloud services",
  ],
  openGraph: {
    title: "SRI — Advanced AI & Web 4.0 Solutions",
    description:
      "Sri Saketha Rama Technologies — Pioneering advanced AI and Web 4.0 solutions.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleOAuthWrapper>
          {children}
        </GoogleOAuthWrapper>
      </body>
    </html>
  );
}
