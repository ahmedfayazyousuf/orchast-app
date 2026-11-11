import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Orchast",
    template: "%s · Orchast",
  },
  description:
    "The Orchast workspace. QUEEN coordinates specialist agents across digital performance, brand advertising and internal tools.",
  icons: {
    icon: [
      { url: "/brand/favicon/favicon.ico" },
      { url: "/brand/favicon/favicon.svg", type: "image/svg+xml" },
      {
        url: "/brand/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: "/brand/favicon/apple-touch-icon.png",
  },
  manifest: "/brand/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className="min-h-screen bg-bg font-sans antialiased">{children}</body>
    </html>
  );
}
