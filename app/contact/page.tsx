import type { Metadata } from "next";

import { SectionPage } from "@/components/section-page";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tanay Kashyap — email, LinkedIn, and GitHub.",
};

export default function ContactPage() {
  return (
    <SectionPage>
      <Contact />
    </SectionPage>
  );
}
