import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { site } from "@/config/site";
import Preloader from "@/components/Layout/Preloader/Preloader";
import SmoothScroll from "@/components/Layout/SmoothScroll/SmoothScroll";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import LeadDialog from "@/components/Layout/LeadDialog/LeadDialog";
import Cursor from "@/components/Layout/Cursor/Cursor";
import "./globals.css";

/** Display: variable width + optical size — condensed 800 for the headlines. */
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  display: "swap",
});

const body = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["500"], display: "swap" });

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
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

// Flags JS before first paint so the preloader and pre-animation states only
// apply when scripts can actually run them.
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
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
        <LeadDialog />
        <Cursor />
      </body>
    </html>
  );
}
