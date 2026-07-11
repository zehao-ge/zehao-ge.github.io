import { site } from "@/content/site";

export function PublicationEntry() {
  const { article, patent } = site.publications;
  return (
    <div className="publication-list">
      <article className="publication-entry">
        <div><h3>{article.title}</h3><p className="citation"><em>{article.citation}</em></p></div>
        <p className="publication-date">{article.date}</p>
        <p className="publication-summary">{article.summary}</p>
        <div className="publication-links">
          {article.links.map((link) => <span className="todo-link" key={link.label}>{link.label} · {link.todo}</span>)}
        </div>
      </article>
      <article className="patent-entry"><p className="caption">{patent.label}</p><h3>{patent.title}</h3><p>{patent.role}</p></article>
    </div>
  );
}
