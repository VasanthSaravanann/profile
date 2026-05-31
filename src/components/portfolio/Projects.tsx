import { Section, Reveal } from "./Section";

const metrics = [
  { value: "12.7s → <500ms", label: "Real-time latency" },
  { value: "6.2% → 1.1%", label: "Defect rate" },
  { value: "82.4% → 94.1%", label: "Equipment effectiveness" },
  { value: "3–5h → 27s", label: "Workflow reconfig" },
];

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      label="Selected Project"
      title={
        <>
          Digital Twin for <em className="italic text-gradient-gold">Manufacturing</em> Optimization.
        </>
      }
    >
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Manufacturing systems suffer from latency, static workflows, and slow
            decision-making. I built an AI-powered orchestration framework that
            mirrors the floor in real time — closing the loop between sensor data,
            quality control, and re-planning.
          </p>
          <div className="mt-10 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {["Digital Twin", "Orchestration", "Edge Inference", "OEE", "Python"].map((t) => (
              <span key={t} className="rounded-full border border-border/60 px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="bg-surface p-6 transition-colors hover:bg-background"
              >
                <div className="font-display text-2xl font-light leading-tight text-gold">
                  {m.value}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}