import { Section, Reveal } from "./Section";

const groups = [
  { label: "Frontend", items: ["React", "React Native", "HTML", "CSS", "Figma"] },
  { label: "Backend", items: ["Java", "C++", "Python"] },
  { label: "ML & Data", items: ["NumPy", "Pandas", "Deep Learning", "Image Processing"] },
  {
    label: "Soft",
    items: ["Research Writing", "Leadership", "Problem Solving", "Team Management", "Presentation"],
  },
  { label: "Languages", items: ["Tamil", "English", "Hindi"] },
];

export function Skills() {
  return (
    <Section
      id="skills"
      index="06"
      label="Toolkit"
      title={<>The things on my <em className="italic text-gradient-gold">bench</em>.</>}
    >
      <div className="grid gap-12 md:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.05}>
            <div className="flex items-baseline gap-6 border-t border-border/40 pt-6">
              <div className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {g.label}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-display text-xl font-light">
                {g.items.map((it, idx) => (
                  <span key={it}>
                    {it}
                    {idx < g.items.length - 1 && (
                      <span className="ml-5 text-gold/60">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}