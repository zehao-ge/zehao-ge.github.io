import type { Metadata } from "next";
import { ConnectContent } from "@/components/ConnectContent";
import { Nav } from "@/components/Nav";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.contact.metaTitle,
  description: site.contact.metaDescription,
  alternates: { canonical: `${site.identity.canonical}/connect` },
  openGraph: {
    title: site.contact.metaTitle,
    description: site.contact.metaDescription,
    url: `${site.identity.canonical}/connect`,
  },
};

export default function ConnectPage() {
  return (
    <>
      <a className="skip-link" href="#connect-content">{site.ui.skip}</a>
      <Nav />
      <main id="connect-content" className="connect-main">
        <ConnectContent />
      </main>
    </>
  );
}
