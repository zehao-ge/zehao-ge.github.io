import { EntityText } from "@/components/EntityText";
import { site, type LinkItem } from "@/content/site";

export function PublicationEntry() {
  const { article } = site.publications;
  const articleLinks: readonly LinkItem[] = article.links;
  return (
    <div className="publication-list">
      <article className="publication-entry">
        <h3>{article.title}</h3>
        <p className="publication-authors"><strong>{article.author}</strong> <EntityText text={article.authorNote} /></p>
        <p className="publication-venue"><EntityText text={article.venue} /></p>
        <p className="publication-meta">{article.publicationMeta}</p>
        <p className="publication-summary">{article.summary}</p>
        <div className="publication-links">
          {articleLinks.map((link) => link.href ? (
            <a className="text-link" href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>{link.label}</a>
          ) : (
            <span className="todo-inline-link" title={link.todo} key={link.label}>{link.label}<sup>{site.ui.todoMarker}</sup></span>
          ))}
        </div>
      </article>
    </div>
  );
}
