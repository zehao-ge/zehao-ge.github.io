import type { ResearchItem } from "@/content/site";

export function ResearchCard({ item }: { item: ResearchItem }) {
  return (
    <article className="research-card">
      <p className="card-number">{item.number}</p>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  );
}
