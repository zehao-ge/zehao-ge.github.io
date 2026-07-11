export function AwardGrid({ items }: { items: readonly (readonly [string, string])[] }) {
  return <div className="award-grid">{items.map(([award, year]) => <div className="award-row" key={award}><span>{award}</span><span>{year}</span></div>)}</div>;
}
