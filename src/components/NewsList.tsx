import { EntityText } from "@/components/EntityText";
import type { NewsItem } from "@/content/site";

export function NewsList({ items }: { items: readonly NewsItem[] }) {
  return (
    <ol className="news-list">
      {items.map((item) => (
        <li className="news-row" key={`${item.date}-${item.text}`}>
          <time>{item.date}</time>
          <p><EntityText text={item.text} /></p>
        </li>
      ))}
    </ol>
  );
}
