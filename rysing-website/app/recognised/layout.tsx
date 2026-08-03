import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import "./recognised.css";

/* Heavy grotesque for the poster type, matching the weight of the wordmark. */
const poster = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poster",
  display: "swap",
});

/* The Didone is the counterpoint, used only on accent words. */
const script = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rysing Studio — Make the world look up",
  description:
    "Rysing is a people branding studio in Vienna. We build the position, the presence and the visibility that make experts impossible to overlook.",
};

export default function RecognisedLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${poster.variable} ${script.variable} ascent`}>{children}</div>;
}
