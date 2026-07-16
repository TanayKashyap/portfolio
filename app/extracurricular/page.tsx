import type { Metadata } from "next";

import { SectionPage } from "@/components/section-page";
import { Extracurricular } from "@/components/sections/Extracurricular";

export const metadata: Metadata = {
  title: "Extracurricular",
  description:
    "VP of Education at the University of Waterloo Data Science Club — applied AI projects, research, and campus initiatives.",
};

export default function ExtracurricularPage() {
  return (
    <SectionPage>
      <Extracurricular />
    </SectionPage>
  );
}
