import { ContactIcon } from "@/components/ContactIcon";
import { site, type EntityLink, type LinkItem } from "@/content/site";

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

export function InlineLinkRow({ links, showTodoMarker = true }: { links: readonly LinkItem[]; showTodoMarker?: boolean }) {
  return (
    <div className="inline-link-row">
      {links.map((link) => (
        <span className="inline-link-item" key={link.label}>
          {link.href ? (
            <a className="contact-link" aria-label={link.ariaLabel ?? link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {link.icon && <ContactIcon name={link.icon} />}<span className="contact-label">{link.label}</span>
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
