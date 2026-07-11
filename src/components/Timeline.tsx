"use client";

import { useState } from "react";
import type { ExperienceItem } from "@/content/site";
import { site } from "@/content/site";

export function Timeline({ items }: { items: readonly ExperienceItem[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className="timeline-entry" key={`${item.organization}-${item.dates}`}>
          <div className="timeline-heading">
            <div><h3>{item.organization}</h3><p className="timeline-role">{item.role}</p></div>
            <p className="timeline-date">{item.dates}</p>
          </div>
          {item.summary && <p className="timeline-summary">{item.summary}</p>}
          <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          {item.more && (
            <div className="timeline-more">
              <button className="text-link disclosure" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
                {expanded ? site.ui.showLess : site.ui.showMore}
              </button>
              {expanded && <ul className="expanded-list">{item.more.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
