import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const word = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.08, duration: 1, ease: EASE },
  }),
};

const title = ["Researcher.", "Builder.", "Quietly", "obsessed", "with", "the", "details."];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between px-6 pb-12 pt-32 md:px-12 md:pt-40"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="relative z-10 flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <div>Vasanth S</div>
          <div className="mt-1">Chengalpattu · IN</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-right font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <div>Portfolio · 2026</div>
          <div className="mt-1 flex items-center justify-end gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Available for work
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-24 md:mt-32">
        <h1 className="font-display text-[14vw] font-light leading-[0.95] tracking-[-0.04em] md:text-[9vw]">
          {title.map((w, i) => (
            <span key={i} className="mr-[0.2em] inline-block overflow-hidden align-bottom">
              <motion.span
                custom={i}
                initial="hidden"
                animate="show"
                variants={word}
                className={`inline-block ${w === "details." ? "italic text-gradient-gold" : ""}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 grid gap-8 border-t border-border/40 pt-8 md:grid-cols-[1.5fr_1fr_1fr]"
        >
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Frontend developer & AI researcher building interfaces, systems and ideas
            that bridge deep learning with everyday usability.
          </p>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Currently
            </div>
            <div className="mt-2 text-sm">
              BS Data Science @ IIT Madras<br />
              B.E. CSE @ RMK College
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Recently
            </div>
            <div className="mt-2 text-sm">
              Frontend Dev @ SLATE IITM<br />
              3 IEEE Publications
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 mt-12 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>↓ Scroll to explore</span>
        <span>01 / 06</span>
      </motion.div>
    </section>
  );
}