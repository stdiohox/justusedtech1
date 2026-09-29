import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { QuickActionsDock } from "@/components/layout/quick-actions-dock";
import { NewsletterPrompt } from "@/components/layout/newsletter-prompt";
import { site } from "@/content/site";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/*
  Icons are not declared here. Next picks up app/favicon.ico, app/icon.png and
  app/apple-icon.png by filename and writes the link tags itself, so there is no import to
  hang a note on. This is that note.

  All three are generated from public/brand/jut-icon-mark.png, the "J" mark rather than the
  lockup: the wordmark is 1248x272 and at 16px in a browser tab it is a smear.

  The .ico carries 16, 32, 48, 64, 128 and 256 so the browser picks its own size instead of
  downscaling one for us, and the mark keeps its transparent background, which reads on a
  light tab strip and a dark one alike. apple-icon.png is the exception and is flattened
  onto white: iOS composites a transparent touch icon onto black, and the mark's dark green
  disappears into it. It also carries more margin, because iOS rounds the corners off.

  TODO: swap for final vector/SVG logo when client delivers it. jut-icon-mark.png is a
  cropped PNG placeholder, so these are placeholders too, and regenerating them is part of
  that swap rather than a separate job.
*/
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.wordmark} | Refurbished tech for underserved students`,
    template: `%s | ${site.wordmark}`,
  },
  description:
    "JustUsedTech is a 501(c)(3) nonprofit that collects and refurbishes used devices in St. Louis, Missouri, then redistributes them to students and young creatives across Nigeria, Ghana, and Kenya.",
  openGraph: {
    title: `${site.wordmark} | ${site.legalName}`,
    description:
      "Reducing e-waste and bridging the technology gap for underserved students and youth.",
    url: site.url,
    siteName: site.legalName,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="min-h-[100dvh] bg-mat">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-brand-green-dark focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        {/* Bar and nav run flush to the viewport edges. Only the hero block is framed. */}
        <AnnouncementBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <QuickActionsDock />
        <NewsletterPrompt />
      </body>
    </html>
  );
}
