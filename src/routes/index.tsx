import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vasanth S — Researcher & Frontend Developer" },
      { name: "description", content: "Portfolio of Vasanth S — frontend developer, AI researcher, and published author working at the intersection of deep learning, data governance, and human-centered interfaces." },
      { property: "og:title", content: "Vasanth S — Researcher & Frontend Developer" },
      { property: "og:description", content: "Frontend developer & AI researcher. Published work in deep learning robustness, data governance, and explainable AI." },
    ],
  }),
  component: Portfolio,
});
