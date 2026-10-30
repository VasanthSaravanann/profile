import { Section, Reveal } from "./Section";

type Project = {
  name: string;
  role: string;
  year: string;
  blurb: string;
  tags: string[];
  repo: string;
  demo?: string;
};

const projects: Project[] = [
  {
    name: "cpp-rag",
    role: "Systems · Retrieval",
    year: "2026",
    blurb:
      "A local RAG pipeline written from scratch in C++ — libllama embeddings, overlapping byte-level chunking, a versioned memory-mapped vector index, and SIMD cosine / dot-product search. Builds with or without llama.cpp so storage and search stay testable offline.",
    tags: ["C++", "CMake", "libllama", "SIMD", "mmap Index"],
    repo: "https://github.com/VasanthSaravanann/cpp-rag",
  },
  {
    name: "biopharma-contamination-detection",
    role: "Research · Edge AI",
    year: "2026",
    blurb:
      "Physics-informed DSP plus an edge One-Class SVM ensemble that flags microbial contamination in biopharmaceutical runs from UV-Vis spectra and bioreactor telemetry. Hardened against factory-side covariate shift via adversarial retraining; a physics-aware MH-DDPM supplies synthetic augmentation for ablation only.",
    tags: ["Python", "UV-Vis DSP", "OCSVM", "MH-DDPM", "Edge Inference"],
    repo: "https://github.com/VasanthSaravanann/biopharma-contamination-detection",
  },
  {
    name: "MARL_DT",
    role: "Research · Digital Twin",
    year: "2025 — 2026",
    blurb:
      "Quantum Crew — physics-informed Digital Twins fused with Multi-Agent Reinforcement Learning (PPO / RLlib), generative scenario modelling and agentic LLM orchestration for sub-second adaptive manufacturing optimization.",
    tags: ["Digital Twin", "MARL · PPO", "RLlib", "Agentic AI", "Python"],
    repo: "https://github.com/VasanthSaravanann/MARL_DT",
  },
  {
    name: "synapse_llama-550k",
    role: "Data · LLM Training",
    year: "2026",
    blurb:
      "A 550K+ example medical-reasoning corpus blended from two source datasets, refactored out of interactive notebooks into modular Python and SLURM jobs for academic HPC — with training, evaluation and edge-deployment configurations.",
    tags: [
      "Medical Reasoning",
      "Dataset Curation",
      "SLURM",
      "Docker",
      "Edge Deploy",
    ],
    repo: "https://github.com/VasanthSaravanann/synapse_llama-550k",
  },
  {
    name: "Biopay",
    role: "Concept · Market Validation",
    year: "2025",
    blurb:
      "A product concept carried through market validation — positioning, demand testing and pricing signal — backed by a working React / TypeScript prototype of the payment experience.",
    tags: ["Concept", "Market Validation", "React", "TypeScript", "Shadcn UI"],
    repo: "https://github.com/VasanthSaravanann/Biopay",
    demo: "https://biopay.vercel.app",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      label="Selected Projects"
      title={
        <>
          Work across <em className="italic text-gradient-gold">research</em>,
          systems and product.
        </>
      }
    >
      <div className="space-y-px">
        {projects.map((p, i) => (
          <Reveal key={p.repo} delay={i * 0.05}>
            <article className="group grid gap-6 border-t border-border/40 py-10 transition-colors hover:bg-surface/40 md:grid-cols-[60px_1fr_1.6fr]">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                0{i + 1}
              </div>
              <div>
                <h3 className="font-display text-2xl font-light leading-snug transition-colors group-hover:text-gold">
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">
                    {p.name}
                  </a>
                </h3>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.role}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.year}
                </div>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {p.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border/60 px-3 py-1.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em]">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold transition-opacity hover:opacity-70"
                  >
                    Source <span aria-hidden>↗</span>
                  </a>
                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Live demo <span aria-hidden>↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
