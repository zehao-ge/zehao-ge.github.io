import type { SkillGroup } from "@/content/site";

export function SkillPills({ groups }: { groups: readonly SkillGroup[] }) {
  return <div className="skill-groups">{groups.map((group) => <section className="skill-group" key={group.label}><h3>{group.label}</h3><div className="pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div></section>)}</div>;
}
