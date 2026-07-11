import { site, type EntityLink } from "@/content/site";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const entities: EntityLink[] = [...site.entities].sort((a, b) => b.label.length - a.label.length);
const matcher = new RegExp(`(${entities.map((entity) => escapeRegExp(entity.label)).join("|")})`, "g");

export function EntityText({ text }: { text: string }) {
  const parts = text.split(matcher);
  return (
    <>
      {parts.map((part, index) => {
        const entity = entities.find((candidate) => candidate.label === part);
        if (!entity) return <span key={`${part}-${index}`}>{part}</span>;
        if (!entity.href) {
          return (
            <span className="entity-todo" title={entity.todo} key={`${part}-${index}`}>
              {part}<sup>{site.ui.todoMarker}</sup>
            </span>
          );
        }
        return (
          <a className="entity-link" href={entity.href} target="_blank" rel="noopener noreferrer" key={`${part}-${index}`}>
            {part}
          </a>
        );
      })}
    </>
  );
}

export function InlineLinkRow({ links, showTodoMarker = true }: { links: readonly { label: string; href: string; todo?: string }[]; showTodoMarker?: boolean }) {
  return (
    <div className="inline-link-row">
      {links.map((link, index) => (
        <span className="inline-link-item" key={link.label}>
          {index > 0 && <span className="link-separator" aria-hidden="true">{site.ui.linkSeparator}</span>}
          {link.href ? (
            <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {link.label}
            </a>
          ) : (
            <span className={showTodoMarker ? "todo-inline-link" : undefined} title={link.todo}>
              {link.label}{showTodoMarker && <sup>{site.ui.todoMarker}</sup>}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
