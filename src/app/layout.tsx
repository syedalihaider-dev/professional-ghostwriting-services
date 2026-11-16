import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { site } from "@/config/site";
import Preloader from "@/components/Layout/Preloader/Preloader";
import SmoothScroll from "@/components/Layout/SmoothScroll/SmoothScroll";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import LeadDialog from "@/components/Layout/LeadDialog/LeadDialog";
import Cursor from "@/components/Layout/Cursor/Cursor";
import Folio from "@/components/Layout/Folio/Folio";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const { seo } = site;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.title, template: `%s | ${site.name}` },
  description: seo.description,
  applicationName: site.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: seo.ogImage.src, width: seo.ogImage.width, height: seo.ogImage.height, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [seo.ogImage.src] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0c",
  colorScheme: "dark",
};

// Flags JS before first paint so the preloader and pre-animation states only
// apply when scripts can actually run them.
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Preloader />
        <SmoothScroll />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Folio />
        <LeadDialog />
        <Cursor />
      </body>
    </html>
  );
}
