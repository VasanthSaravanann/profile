import { Section, Reveal } from "./Section";

const jobs = [
  {
    role: "Frontend Developer",
    org: "SLATE — IIT Madras",
    when: "Feb — Jun 2025",
    type: "Remote",
    bullets: [
      "Built and optimized UIs for web & mobile across the SLATE learning platform.",
      "Shipped responsive, interactive components in React and React Native.",
      "Partnered with design to refine accessibility and motion across flows.",
    ],
  },
  {
    role: "Intern",
    org: "Rane NSK",
    when: "Jun — Jul 2024",
    type: "On-site",
    bullets: [
      "Managed IT assets and improved internal asset-tracking systems.",
      "Supported networking infrastructure setup and troubleshooting.",
    ],
  },
  {
    role: "Network Operations Assistant",
    org: "BSNL · Railwire Franchise",
    when: "Earlier",
    type: "Field",
    bullets: [
      "Configured routers and ONTs at customer locations.",
      "Resolved network issues end-to-end for subscribers.",
    ],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      label="Experience"
      title={<>A short, real <em className="italic text-gradient-gold">timeline</em>.</>}
    >
      <div className="space-y-px">
        {jobs.map((j, i) => (
          <Reveal key={j.org} delay={i * 0.05}>
            <article className="group grid gap-6 border-t border-border/40 py-10 transition-colors hover:bg-surface/40 md:grid-cols-[140px_1fr_2fr]">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {j.when}
              </div>
              <div>
                <h3 className="font-display text-2xl font-light transition-colors group-hover:text-gold">
                  {j.role}
                </h3>
                <div className="mt-1 text-sm text-muted-foreground">
                  {j.org} · <span className="italic">{j.type}</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {j.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 inline-block h-px w-4 flex-shrink-0 bg-gold" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}