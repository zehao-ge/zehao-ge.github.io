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
        <div className="profile-aside">
          <div className="portrait-frame">
            {portraitExists ? (
              <Image src={portrait.path} alt={portrait.alt} width={portrait.width} height={portrait.height} priority />
            ) : (
              <div className="portrait-placeholder" role="img" aria-label={site.ui.portraitPlaceholder}>
                <span>{site.ui.portraitPlaceholder}</span>
              </div>
            )}
          </div>
          <InlineLinkRow links={site.header.links} showTodoMarker={false} />
        </div>
        <div className="profile-copy">
          <h1 id="profile-title">
            <span className="profile-name-unit">{site.header.heading}</span>
          </h1>
          {site.header.bio.map((paragraph) => <p className="profile-bio" key={paragraph}><EntityText text={paragraph} /></p>)}
          <div className="profile-statements">
            {site.header.statements.map((statement) => (
              <p key={statement.label}>
                <strong>{statement.label}</strong>{" "}<EntityText text={statement.text} />
              </p>
            ))}
          </div>
          <p className="profile-email">
            {site.header.email.label}{" "}<a href={site.header.email.href}>{site.header.email.address}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
