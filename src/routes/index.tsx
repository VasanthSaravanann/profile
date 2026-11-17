import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vasanth Saravanan — AI Engineer & Researcher" },
      {
        name: "description",
        content:
          "Portfolio of Vasanth Saravanan — AI engineer and researcher pursuing a Master of AI, working across applied machine learning, systems, and the interfaces built on top.",
      },
      {
        property: "og:title",
        content: "Vasanth Saravanan — AI Engineer & Researcher",
      },
      {
        property: "og:description",
        content:
          "AI engineer & researcher pursuing a Master of AI. Published work in deep learning robustness, data governance, and explainable AI.",
      },
    ],
  }),
  component: Portfolio,
});
