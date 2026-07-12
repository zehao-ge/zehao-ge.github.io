import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EntityText } from "@/components/EntityText";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { site, workItems } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return workItems.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = workItems.find((candidate) => candidate.slug === params.slug);
  if (!project) return {};

  const title = `${project.title}${site.ui.detail.titleSeparator}${site.identity.displayName}`;
  const canonical = `${site.identity.canonical}/work/${project.slug}`;
  const socialImage = project.detail.images[0] ?? project.image;

  return {
    title,
    description: project.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: project.description,
      type: "article",
      url: canonical,
      images: [{ url: socialImage.path, width: socialImage.width, height: socialImage.height, alt: socialImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [socialImage.path],
    },
  };
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const projectIndex = workItems.findIndex((candidate) => candidate.slug === params.slug);
  if (projectIndex < 0) notFound();

  const project = workItems[projectIndex];
  const previous = workItems[projectIndex - 1];
  const next = workItems[projectIndex + 1];

  return (
    <>
      <a className="skip-link" href="#project-content">{site.ui.skip}</a>
      <Nav />
      <main id="project-content" className="work-detail-main">
        <article className="work-detail site-container">
          <Reveal priority><a className="detail-back text-link" href={site.ui.detail.workHref}>{site.ui.detail.backToWork}</a></Reveal>
          <Reveal priority><h1>{project.title}</h1></Reveal>
          <Reveal priority>
            <p className="work-meta detail-meta">
              <span>{project.year}</span><span className="context-tag">[{project.context}]</span>{project.status && <span>{project.status}</span>}
            </p>
          </Reveal>
          <Reveal priority><p className="detail-summary"><EntityText text={project.description} /></p></Reveal>

          {project.detail.status && (
            <section className="detail-status-project">
              <Reveal>
                <figure className="detail-status-cover">
                  <Image src={project.image.path} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 1028px) calc(100vw - 48px), 980px" priority />
                  {project.imageCaption && <figcaption>{project.imageCaption}</figcaption>}
                </figure>
              </Reveal>
              <Reveal><p className="detail-status-copy">{project.detail.status}</p></Reveal>
            </section>
          )}

          {!project.detail.status && project.detail.body?.map((paragraph) => (
            <Reveal key={paragraph}><p className="detail-body"><EntityText text={paragraph} /></p></Reveal>
          ))}

          {!project.detail.status && project.detail.todo && <Reveal><p className="detail-todo">{project.detail.todo}</p></Reveal>}

          {!project.detail.status && project.detail.relatedLinks && project.detail.relatedLinks.length > 0 && (
            <Reveal>
              <div className="detail-related-links">
                {project.detail.relatedLinks.map((link) => <a className="text-link" href={link.href} key={link.label}>{link.label}</a>)}
              </div>
            </Reveal>
          )}

          {!project.detail.status && project.detail.facts && project.detail.facts.length > 0 && (
            <Reveal>
              <section className="detail-facts" aria-labelledby="detail-facts-title">
                <h2 id="detail-facts-title">{site.ui.detail.factsHeading}</h2>
                <dl>
                  {project.detail.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
                </dl>
              </section>
            </Reveal>
          )}

          {!project.detail.status && project.detail.video && (
            <Reveal>
              <section className="detail-video">
                <div className="detail-video-frame">
                  <iframe
                    src={project.detail.video.embedUrl}
                    title={project.detail.video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <a className="text-link detail-video-link" href={project.detail.video.linkHref} target="_blank" rel="noopener noreferrer">{project.detail.video.linkLabel}</a>
              </section>
            </Reveal>
          )}

          {!project.detail.status && project.detail.images.length > 0 && (
            <section className="detail-gallery" aria-labelledby="detail-gallery-title">
              <Reveal><h2 id="detail-gallery-title">{site.ui.detail.galleryHeading}</h2></Reveal>
              {project.detail.images.map((image, imageIndex) => (
                <Reveal key={image.path}>
                  <figure>
                    <Image src={image.path} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 1028px) calc(100vw - 48px), 980px" priority={imageIndex === 0} />
                    {(image.caption || image.attribution) && (
                      <figcaption><span>{image.caption}</span>{image.attribution && <span className="detail-attribution">{image.attribution}</span>}</figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </section>
          )}

          {!project.detail.status && project.detail.externalLinks && project.detail.externalLinks.length > 0 && (
            <Reveal>
              <section className="detail-external" aria-labelledby="detail-external-title">
                <h2 id="detail-external-title">{site.ui.detail.externalLinksHeading}</h2>
                <div className="work-links">
                  {project.detail.externalLinks.map((link) => <a className="text-link" href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>{link.label}</a>)}
                </div>
              </section>
            </Reveal>
          )}

          <Reveal>
            <nav className="detail-project-nav" aria-label={site.ui.detail.projectNavigation}>
              {previous && <a href={`/work/${previous.slug}`}><span>{site.ui.detail.previousProject}</span><strong>{previous.title}</strong></a>}
              {next && <a className="detail-next" href={`/work/${next.slug}`}><span>{site.ui.detail.nextProject}</span><strong>{next.title}</strong></a>}
            </nav>
          </Reveal>
        </article>
      </main>
    </>
  );
}
