import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { EntityText, InlineLinkRow } from "@/components/EntityText";
import { site } from "@/content/site";

export function ProfileHeader() {
  const { portrait } = site.header;
  const portraitExists = existsSync(join(process.cwd(), "public", portrait.path.replace(/^\//, "")));

  return (
    <section className="profile-header section" aria-labelledby="profile-title">
      <div className="content-width profile-grid">
        <div className="portrait-frame">
          {portraitExists ? (
            <Image src={portrait.path} alt={portrait.alt} width={portrait.width} height={portrait.height} priority />
          ) : (
            <div className="portrait-placeholder" role="img" aria-label={site.ui.portraitPlaceholder}>
              <span>{site.ui.portraitPlaceholder}</span>
            </div>
          )}
        </div>
        <div className="profile-copy">
          <h1 id="profile-title">{site.header.heading}</h1>
          <p className="profile-bio"><EntityText text={site.header.bio} /></p>
          <p className="profile-interests">{site.header.interests}</p>
          <InlineLinkRow links={site.header.links} />
        </div>
      </div>
    </section>
  );
}
