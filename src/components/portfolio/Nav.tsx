import { motion } from "motion/react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12"
    >
      <a href="#top" className="font-display text-xl font-medium tracking-tight">
        Vasanth<span className="text-gold">.</span>
      </a>
      <ul className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a className="transition-colors hover:text-foreground" href={l.href}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all hover:border-gold hover:text-gold"
      >
        Let's talk
      </a>
    </motion.nav>
  );
}