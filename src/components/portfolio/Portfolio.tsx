import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";
import { Publications } from "./Publications";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Contact } from "./Contact";

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={ref}
        className="relative min-h-screen overflow-hidden bg-background text-foreground"
      >
        <a href="#content" className="skip-link">
          Skip to main content
        </a>
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.04] mix-blend-overlay bg-grain"
          aria-hidden
        />
        <motion.div
          style={{ scaleX }}
          aria-hidden
          className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gold"
        />
        <Nav />
        <main id="content" tabIndex={-1} className="relative">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Publications />
          <Skills />
          <Contact />
        </main>
        <footer
          suppressHydrationWarning
          className="border-t border-border/50 py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          © {new Date().getFullYear()} · Vasanth Saravanan · Crafted with intent
        </footer>
      </div>
    </MotionConfig>
  );
}
