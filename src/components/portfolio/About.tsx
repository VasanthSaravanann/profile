import { Section, Reveal } from "./Section";

export function About() {
  return (
    <Section
      id="about"
      index="02"
      label="About"
      title={
        <>
          I sit between <em className="italic text-gradient-gold">research</em> and the
          interface — translating models, papers and data into things people can actually
          touch.
        </>
      }
    >
      <div className="grid gap-12 md:grid-cols-3">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Discipline
          </div>
          <p className="mt-3 text-base leading-relaxed">
            Computer Science & Data Science undergraduate working across frontend
            engineering, applied ML, and systems thinking.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Research
          </div>
          <p className="mt-3 text-base leading-relaxed">
            Three IEEE conference papers spanning deep-learning robustness, data
            governance, and explainable AI — led as research team lead.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Craft
          </div>
          <p className="mt-3 text-base leading-relaxed">
            React, React Native and modern UI systems. I care about typography,
            motion that earns its place, and interfaces that feel inevitable.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}