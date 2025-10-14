import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gloria's Coffee Bar | Laredo, TX",
  description:
    "Discover Gloria's Coffee Bar in Laredo, Texas – craft espresso, seasonal specials, and a warm neighborhood vibe in a single scrolling experience.",
  metadataBase: new URL("https://glorias-coffee.example"),
  openGraph: {
    title: "Gloria's Coffee Bar",
    description:
      "Modern coffee bar in Laredo serving signature drinks, pastries, and community events.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${sourceSans.variable} antialiased bg-[var(--color-page-bg)] text-[var(--color-ink)]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
