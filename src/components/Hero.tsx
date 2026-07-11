import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="hero section" aria-labelledby="hero-title">
      <div className="content-width hero-copy">
        <p className="eyebrow">{site.hero.eyebrow}</p>
        <h1 id="hero-title">{site.hero.heading}</h1>
        <p className="hero-tagline">{site.hero.tagline}</p>
        <p className="body-large hero-statement">{site.hero.statement}</p>
        <p className="hero-provenance">{site.hero.provenance}</p>
        <div className="hero-actions">
          <a className="text-link" href="#research">{site.hero.researchCta}</a>
          <a className="primary-pill" href="/cv/GeZehao_CV.pdf">{site.ui.downloadCv}</a>
        </div>
      </div>
      <div className="grid-width hero-media">
        <div className="photo-placeholder" role="img" aria-label={site.ui.photoAlt}>
          <span>{site.ui.photoTodo}</span>
        </div>
      </div>
    </section>
  );
}
