import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { EntityText } from "@/components/EntityText";
import type { WorkImage, WorkItem } from "@/content/site";
import { site } from "@/content/site";

function WorkImageView({ image, number, thumbnail = false }: { image: WorkImage; number: string; thumbnail?: boolean }) {
  const imageExists = existsSync(join(process.cwd(), "public", image.path.replace(/^\//, "")));
  return (
    <div className={thumbnail ? "work-image work-thumbnail" : "work-image"}>
      {imageExists ? (
        <Image src={image.path} alt={image.alt} width={image.width} height={image.height} sizes={thumbnail ? "(max-width: 720px) 50vw, 140px" : "(max-width: 720px) 100vw, 280px"} />
      ) : (
        <div className="work-image-placeholder" role="img" aria-label={`${site.ui.imagePlaceholder} ${number}`}>
          <span>{number}</span>
        </div>
      )}
    </div>
  );
}

export function WorkEntry({ item }: { item: WorkItem }) {
  const primary = item.images[0];
  const thumbnails = item.images.slice(1);
  const realLinks = item.links.filter((link) => link.href);

  return (
    <article className="work-entry">
      <div className="work-media">
        <WorkImageView image={primary} number={item.number} />
        {thumbnails.length > 0 && (
          <div className="work-thumbnails">
            {thumbnails.map((image) => <WorkImageView image={image} number={item.number} thumbnail key={image.path} />)}
          </div>
        )}
        {item.imageCaption && <p className="image-caption">{item.imageCaption}</p>}
      </div>
      <div className="work-copy">
        <h3><EntityText text={item.title} /></h3>
        <p className="work-meta">
          <span>{item.year}</span><span className="context-tag">[{item.context}]</span>{item.status && <span>{item.status}</span>}
        </p>
        <p className="work-description"><EntityText text={item.description} /></p>
        {realLinks.length > 0 && (
          <div className="work-links">
            {realLinks.map((link) => <a className="text-link" href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label}</a>)}
          </div>
        )}
      </div>
    </article>
  );
}
