import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rysing Studio — Expertise into authority",
  description:
    "Rysing Studio builds personal brands that turn ambitious experts into recognised authorities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
