import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/content/site";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-inter", display: "optional", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.identity.canonical),
  title: site.identity.title,
  description: site.identity.description,
  alternates: { canonical: site.identity.canonical },
  openGraph: {
    title: site.identity.title,
    description: site.identity.description,
    type: "profile",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: site.identity.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.identity.title,
    description: site.identity.description,
    images: ["/og.svg"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sameAs = site.contact.profiles.map((profile) => profile.href || profile.todo);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.identity.name,
    affiliation: { "@type": "Organization", name: site.identity.affiliation },
    email: `mailto:${site.identity.email}`,
    sameAs,
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: site.publications.article.title,
    author: { "@type": "Person", name: site.identity.name },
    isPartOf: site.publications.article.citation,
    datePublished: site.publications.article.date,
    description: site.publications.article.summary,
  };
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body id="top">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([person, article]) }} />
      </body>
    </html>
  );
}
