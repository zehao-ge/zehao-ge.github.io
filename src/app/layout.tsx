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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sameAs = site.contact.profiles.filter((profile) => profile.href.startsWith("http")).map((profile) => profile.href);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.identity.name,
    alternateName: site.identity.preferredName,
    givenName: site.identity.givenName,
    familyName: site.identity.familyName,
    affiliation: { "@type": "Organization", name: site.identity.affiliation },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: site.identity.alumniOf,
      description: site.identity.degree,
    },
    description: site.identity.description,
    email: `mailto:${site.identity.email}`,
    sameAs,
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: site.publications.article.title,
    author: { "@type": "Person", name: site.identity.name },
    isPartOf: site.publications.article.venue,
    datePublished: site.publications.article.datePublished,
    identifier: site.publications.article.doi,
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
