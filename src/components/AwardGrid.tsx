import { EntityText } from "@/components/EntityText";

export function AwardGrid({ items }: { items: readonly (readonly [string, string])[] }) {
  return <div className="award-grid">{items.map(([award, year]) => <div className="award-row" key={award}><span><EntityText text={award} /></span><span>{year}</span></div>)}</div>;
}
