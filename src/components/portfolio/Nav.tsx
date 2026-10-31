import { motion } from "motion/react";
import { useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#publications" },
  { label: "Toolkit", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-40 flex flex-col items-center justify-between px-6 py-5 backdrop-blur-sm md:flex-row md:px-12 md:backdrop-blur-none"
    >
      <div className="flex w-full items-center justify-between md:contents">
        <a
          href="#top"
          className="whitespace-nowrap font-display text-lg font-medium tracking-tight md:text-xl"
        >
          Vasanth Saravanan<span className="text-gold">.</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>
      <ul className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a
              className="transition-colors hover:text-foreground"
              href={l.href}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      {open && (
        <ul
          id="nav-mobile-menu"
          className="mt-4 flex w-full flex-col items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                className="transition-colors hover:text-foreground"
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-full border border-border/60 px-4 py-2 transition-colors hover:border-gold hover:text-gold"
            >
              Let's talk
            </a>
          </li>
        </ul>
      )}
      <a
        href="#contact"
        className="mt-4 hidden rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all hover:border-gold hover:text-gold md:block"
      >
        Let's talk
      </a>
    </motion.nav>
  );
}
