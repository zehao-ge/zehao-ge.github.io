import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import { EntityText } from "@/components/EntityText";
import type { WorkImage, WorkItem } from "@/content/site";
import { site } from "@/content/site";

function WorkImageView({ image, number }: { image: WorkImage; number: string }) {
  const imageExists = existsSync(join(process.cwd(), "public", image.path.replace(/^\//, "")));
  return (
    <div className="work-image">
      {imageExists ? (
        <Image src={image.path} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 720px) 100vw, 280px" />
      ) : (
        <div className="work-image-placeholder" role="img" aria-label={`${site.ui.imagePlaceholder} ${number}`}>
          <span>{number}</span>
        </div>
      )}
    </div>
  );
}

export function WorkEntry({ item }: { item: WorkItem }) {
  const detailHref = `/work/${item.slug}`;

  return (
    <article className="work-entry">
      <div className="work-media">
        <Link className="work-media-link" href={detailHref} aria-label={`${site.ui.detail.viewProject} ${item.title}`}>
          <WorkImageView image={item.image} number={item.number} />
        </Link>
        {item.imageCaption && <p className="image-caption">{item.imageCaption}</p>}
      </div>
      <div className="work-copy">
        <h3><Link className="work-title-link" href={detailHref}>{item.title}</Link></h3>
        <p className="work-meta">
          <span>{item.year}</span><span className="context-tag">[{item.context}]</span>{item.status && <span>{item.status}</span>}
        </p>
        <p className="work-description"><EntityText text={item.description} /></p>
        <div className="work-links"><Link className="text-link" href={detailHref}>{site.ui.detail.viewProject}</Link></div>
      </div>
    </article>
  );
}
