import type { Metadata } from "next";

import { SectionPage } from "@/components/section-page";
import { Skills } from "@/components/sections/Skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, libraries, tools, and core competencies — Python, PyTorch, SQL, causal inference, and more.",
};

export default function SkillsPage() {
  return (
    <SectionPage>
      <Skills />
    </SectionPage>
  );
}
