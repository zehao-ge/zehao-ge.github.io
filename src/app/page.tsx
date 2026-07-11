import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ResearchCard } from "@/components/ResearchCard";
import { Timeline } from "@/components/Timeline";
import { PublicationEntry } from "@/components/PublicationEntry";
import { AwardGrid } from "@/components/AwardGrid";
import { SkillPills } from "@/components/SkillPills";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">{site.ui.skip}</a>
      <Nav />
      <main id="main-content">
        <Hero />
        <section id="research" className="section alt-section" aria-labelledby="research-title">
          <div className="grid-width">
            <Reveal><h2 id="research-title">{site.research.heading}</h2><p className="section-lede">{site.research.lede}</p></Reveal>
            <div className="research-grid">{site.research.items.map((item, index) => <Reveal key={item.number} delay={index * 0.08}><ResearchCard item={item} /></Reveal>)}</div>
            <Reveal><p className="caption research-footnote">{site.research.footnote}</p></Reveal>
          </div>
        </section>
        <section id="experience" className="section" aria-labelledby="experience-title">
          <div className="content-width"><Reveal><h2 id="experience-title">{site.experience.heading}</h2></Reveal><Reveal delay={0.08}><Timeline items={site.experience.items} /></Reveal></div>
        </section>
        <section id="publications" className="section alt-section" aria-labelledby="publications-title">
          <div className="content-width"><Reveal><h2 id="publications-title">{site.publications.heading}</h2></Reveal><Reveal delay={0.08}><PublicationEntry /></Reveal></div>
        </section>
        <section id="education" className="section" aria-labelledby="education-title">
          <div className="content-width"><Reveal><h2 id="education-title">{site.education.heading}</h2></Reveal><Reveal delay={0.08}><article className="education-entry"><div><h3>{site.education.institution}</h3><p>{site.education.degree}</p></div><p className="caption">{site.education.dates}</p><p className="education-detail">{site.education.detail}</p></article></Reveal></div>
        </section>
        <section id="awards" className="section alt-section" aria-labelledby="awards-title">
          <div className="grid-width"><Reveal><h2 id="awards-title">{site.awards.heading}</h2></Reveal><Reveal delay={0.08}><AwardGrid items={site.awards.items} /></Reveal></div>
        </section>
        <section id="skills" className="section" aria-labelledby="skills-title">
          <div className="content-width"><Reveal><h2 id="skills-title">{site.skills.heading}</h2></Reveal><Reveal delay={0.08}><SkillPills groups={site.skills.groups} /></Reveal></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
