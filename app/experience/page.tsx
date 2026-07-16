import type { Metadata } from "next";

import { SectionPage } from "@/components/section-page";
import { Experience } from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Work Experience",
  description:
    "Data science and machine learning internships at PepsiCo, RBC, and Magnet Forensics — forecasting, recommendations, NLP, and production pipelines.",
};

export default function ExperiencePage() {
  return (
    <SectionPage>
      <Experience />
    </SectionPage>
  );
}
