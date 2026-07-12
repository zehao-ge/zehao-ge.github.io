import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { EntityText, InlineLinkRow } from "@/components/EntityText";
import { ParticleName } from "@/components/ParticleName";
import { site } from "@/content/site";

export function ProfileHeader() {
  const { portrait } = site.header;
  const portraitExists = existsSync(join(process.cwd(), "public", portrait.path.replace(/^\//, "")));

  return (
    <section className="profile-header section" aria-labelledby="profile-title">
      <div className="site-container profile-grid">
        <div className="profile-aside">
          <a className="portrait-frame portrait-link" href="/connect" aria-label={site.ui.getInTouch}>
            {portraitExists ? (
              <Image src={portrait.path} alt={portrait.alt} width={portrait.width} height={portrait.height} priority />
            ) : (
              <div className="portrait-placeholder" role="img" aria-label={site.ui.portraitPlaceholder}>
                <span>{site.ui.portraitPlaceholder}</span>
              </div>
            )}
            <span className="portrait-inset" aria-hidden="true" />
          </a>
        </div>
        <div className="profile-copy">
          <ParticleName />
          <div className="profile-link-rows">
            <InlineLinkRow links={site.header.links} />
          </div>
          {site.header.bio.map((paragraph) => <p className="profile-bio" key={paragraph}><EntityText text={paragraph} /></p>)}
          <div className="profile-statements">
            {site.header.statements.map((statement) => (
              <p key={statement.label}>
                <strong>{statement.label}</strong>{" "}<EntityText text={statement.text} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
