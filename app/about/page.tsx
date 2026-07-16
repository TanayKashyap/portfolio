import type { Metadata } from "next";

import { SectionPage } from "@/components/section-page";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Tanay Kashyap — BMath Statistics at the University of Waterloo, with data science and machine learning internships at PepsiCo, RBC, and Magnet Forensics.",
};

export default function AboutPage() {
  return (
    <SectionPage>
      <About />
    </SectionPage>
  );
}
