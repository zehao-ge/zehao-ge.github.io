import { AwardGrid } from "@/components/AwardGrid";
import { EntityText } from "@/components/EntityText";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { NewsList } from "@/components/NewsList";
import { ProfileHeader } from "@/components/ProfileHeader";
import { PublicationEntry } from "@/components/PublicationEntry";
import { Reveal } from "@/components/Reveal";
import { SkillPills } from "@/components/SkillPills";
import { Timeline } from "@/components/Timeline";
import { WorkEntry } from "@/components/WorkEntry";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">{site.ui.skip}</a>
      <Nav />
      <main id="main-content">
        <ProfileHeader />
        <section className="section news-section" aria-labelledby="news-title">
          <div className="content-width">
            <Reveal><h2 id="news-title">{site.news.heading}</h2></Reveal>
            <Reveal><NewsList items={site.news.items} /></Reveal>
          </div>
        </section>
        <section id="work" className="section" aria-labelledby="work-title">
          <div className="grid-width">
            <Reveal><h2 id="work-title">{site.work.heading}</h2><p className="work-framing">{site.work.framing}</p></Reveal>
            {site.work.groups.map((group) => (
              <section className="work-group" aria-labelledby={`work-group-${group.heading.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`} key={group.heading}>
                <Reveal><h3 className="work-group-title" id={`work-group-${group.heading.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}>{group.heading}</h3></Reveal>
                <div className="work-list">{group.items.map((item) => <Reveal key={item.number}><WorkEntry item={item} /></Reveal>)}</div>
              </section>
            ))}
          </div>
        </section>
        <section id="publications" className="section alt-section" aria-labelledby="publications-title">
          <div className="content-width"><Reveal><h2 id="publications-title">{site.publications.heading}</h2></Reveal><Reveal><PublicationEntry /></Reveal></div>
        </section>
        <section id="experience" className="section" aria-labelledby="experience-title">
          <div className="content-width"><Reveal><h2 id="experience-title">{site.experience.heading}</h2></Reveal><Reveal><Timeline items={site.experience.items} /></Reveal></div>
        </section>
        <section id="education" className="section alt-section" aria-labelledby="education-title">
          <div className="content-width">
            <Reveal><h2 id="education-title">{site.education.heading}</h2></Reveal>
            <div className="education-list">
              {site.education.items.map((item) => <Reveal key={item.institution}><article className="education-entry"><div><h3><EntityText text={item.institution} /></h3><p><EntityText text={item.degree} /></p></div><p className="caption">{item.dates}</p>{item.detail && <p className="education-detail">{item.detail}</p>}</article></Reveal>)}
            </div>
          </div>
        </section>
        <section id="awards" className="section" aria-labelledby="awards-title">
          <div className="grid-width"><Reveal><h2 id="awards-title">{site.awards.heading}</h2></Reveal><Reveal><AwardGrid items={site.awards.items} /></Reveal></div>
        </section>
        <section id="skills" className="section alt-section" aria-labelledby="skills-title">
          <div className="content-width"><Reveal><h2 id="skills-title">{site.skills.heading}</h2></Reveal><Reveal><SkillPills groups={site.skills.groups} /></Reveal></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
