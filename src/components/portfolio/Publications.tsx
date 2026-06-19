import { Section, Reveal } from "./Section";

const papers = [
  {
    title:
      "Bridge the Generalization Gap: A Comprehensive Framework for Enhanced Reliability and Robustness in Deep Learning Models",
    venue: "IEEE ICSES 2024 · Chennai",
    doi: "10.1109/ICSES63760.2024.10910534",
    url: "https://doi.org/10.1109/ICSES63760.2024.10910534",
  },
  {
    title:
      "Data Governance in the Big Data Era: A Scalable Framework for Effective Management and Regulatory Compliance",
    venue: "IEEE ICSES 2024 · Chennai",
    doi: "10.1109/ICSES63760.2024.10910410",
    url: "https://doi.org/10.1109/ICSES63760.2024.10910410",
  },
  {
    title: "Demystifying AI: A Robust and Comprehensive Approach to Explainable AI",
    venue: "IEEE ICEC 2024",
    doi: "10.1109/ICEC59683.2024.10837078",
    url: "https://doi.org/10.1109/ICEC59683.2024.10837078",
  },
  {
    title:
      "Automated Dynamic Schema Evolution for Eliminating Pipeline Brittleness in Real-Time Data Ingestion Systems",
    venue: "ICCT-SD 2026 · GNDEC × NIT Delhi",
    doi: "Presented",
    url: "",
  },
];

export function Publications() {
  return (
    <Section
      id="publications"
      index="05"
      label="Research & Publications"
      title={
        <>
          Papers, conferences and <em className="italic text-gradient-gold">questions</em> worth chasing.
        </>
      }
    >
      <div className="space-y-px">
        {papers.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <article className="group grid items-baseline gap-4 border-t border-border/40 py-8 md:grid-cols-[60px_1fr_240px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                0{i + 1}
              </div>
              <div>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-display text-xl font-light leading-snug transition-colors hover:text-gold md:text-2xl">
                    {p.title}
                  </a>
                ) : (
                  <h3 className="font-display text-xl font-light leading-snug md:text-2xl">
                    {p.title}
                  </h3>
                )}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-right">
                <div>{p.venue}</div>
                <div className="mt-1 text-foreground/60">{p.doi}</div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}