import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Friends Memory",
  description: "Mobile-first PWA for memorizing Friends scripts and vocabulary.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Friends Memory",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffd84d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
