import type { Metadata } from "next";

import { SectionPage } from "@/components/section-page";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Side projects and write-ups from Tanay Kashyap — data science and machine learning work in progress.",
};

export default function ProjectsPage() {
  return (
    <SectionPage>
      <Projects />
    </SectionPage>
  );
}
