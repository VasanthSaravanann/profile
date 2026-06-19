import { motion } from "motion/react";

const links = [
  { label: "Email", href: "mailto:vasanths991@gmail.com" },
  { label: "GitHub", href: "https://github.com/VasanthSaravanann", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vasanthsaravanan/", external: true },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/Vasanth-Saravanan", external: true },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32 md:px-12 md:py-48">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-center gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">07</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Contact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display text-6xl font-light leading-[1] md:text-[9vw]"
        >
          Let's build <em className="italic text-gradient-gold">something</em> careful.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-16 grid gap-10 border-t border-border/40 pt-10 md:grid-cols-[1fr_auto]"
        >
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm open to internships, collaborations on applied AI and interface work,
            and research projects. The fastest way to reach me is email.
          </p>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-6 border-b border-border/40 py-2 text-sm transition-colors hover:text-gold"
              >
                <span>{l.label}</span>
                <span className="text-gold transition-transform group-hover:translate-x-1">→</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}