import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anujacharjee.com"),
  title: "Anuj Acharjee | Portfolio",
  description: "Full-stack developer portfolio showcasing projects, skills, and contributions.",

  openGraph: {
    title: "Anuj Acharjee | Portfolio",
    description: "Full-stack developer portfolio showcasing projects, skills, and contributions.",
    url: "https://anujacharjee.com",
    images: ["/og-image.png"],
  },

  // Controls search engine crawling
  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/logo/favicon.ico" },
      { url: "/logo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/logo/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "icon", url: "/logo/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/logo/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
