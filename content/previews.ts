import booksData from "@/content/books.json";
import { experience } from "@/content/experience";
import { extracurricular } from "@/content/extracurricular";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";

/**
 * Structured summaries shown inside the open-book preview on the shelf.
 * Everything here is derived from the content files — nothing is invented.
 */

export interface PreviewFact {
  label: string;
  value: string;
}

export interface SectionPreview {
  /** Matches the shelf section id and the route segment. */
  id: string;
  title: string;
  /** Small mono line under the title — factual, not decorative. */
  kicker: string;
  blurb: string;
  facts: PreviewFact[];
  cta: string;
}

interface BooksJson {
  books: Array<{ title: string; shelf: string; rating: number }>;
}

const { books } = booksData as BooksJson;
const currentlyReading = books.find((b) => b.shelf === "currently-reading");
const readCount = books.filter((b) => b.shelf === "read").length;
const toReadCount = books.filter((b) => b.shelf === "to-read").length;
const totalSkills = skillGroups.reduce((sum, g) => sum + g.skills.length, 0);

export const SECTION_PREVIEWS: Record<string, SectionPreview> = {
  about: {
    id: "about",
    title: "About",
    kicker: "Waterloo · Statistics · 2026",
    blurb:
      "Finishing a Bachelor of Mathematics in Statistics at the University of Waterloo.",
    facts: [
      { label: "School", value: site.education.school },
      { label: "Major", value: "Statistics" },
      { label: "Graduating", value: site.education.graduation },
      { label: "Internships", value: `${experience.length} in data & ML` },
    ],
    cta: "Open About",
  },
  experience: {
    id: "experience",
    title: "Work Experience",
    kicker: `${experience.length} roles · 2023 – 2025`,
    blurb:
      "Forecasting, recommendations, NLP, and the pipelines that keep them reliable in production.",
    facts: experience.map((role) => ({
      label: role.company,
      value: `${role.title} · ${role.start} – ${role.end}`,
    })),
    cta: "Open Work Experience",
  },
  projects: {
    id: "projects",
    title: "Projects",
    kicker:
      projects.length === 0
        ? "Write-ups in progress"
        : `${projects.length} projects`,
    blurb:
      "Write-ups are in progress. The work itself lives on GitHub in the meantime.",
    facts:
      projects.length > 0
        ? projects.slice(0, 4).map((p) => ({
            label: p.title,
            value: p.tags.slice(0, 3).join(" · "),
          }))
        : [
            { label: "Status", value: "Being written up" },
            { label: "Meanwhile", value: "On GitHub" },
          ],
    cta: "Open Projects",
  },
  skills: {
    id: "skills",
    title: "Skills",
    kicker: `${totalSkills} tools · ${skillGroups.length} groups`,
    blurb: "Languages, libraries, and tools I use day to day.",
    facts: skillGroups.map((group) => ({
      label: group.label,
      value:
        group.skills.length <= 3
          ? group.skills.join(", ")
          : `${group.skills.slice(0, 3).join(", ")} +${group.skills.length - 3}`,
    })),
    cta: "Open Skills",
  },
  extracurricular: {
    id: "extracurricular",
    title: "Extracurricular",
    kicker: "Data Science Club",
    blurb:
      "Former VP of Education — led applied AI projects and campus education work.",
    facts: extracurricular.map((item) => ({
      label: item.organization,
      value: `${item.role} · ${item.start} – ${item.end}`,
    })),
    cta: "Open Extracurricular",
  },
  books: {
    id: "books",
    title: "Book Reviews",
    kicker: `${books.length} from Goodreads`,
    blurb: "What I read, with ratings and reviews.",
    facts: [
      ...(currentlyReading
        ? [{ label: "Reading now", value: currentlyReading.title }]
        : []),
      { label: "Finished", value: `${readCount} with notes` },
      { label: "To-read", value: `${toReadCount}` },
    ],
    cta: "Open Book Reviews",
  },
  contact: {
    id: "contact",
    title: "Contact",
    kicker: "Email · LinkedIn · GitHub",
    blurb: "Email is fastest. Happy to talk data, statistics, or books.",
    facts: [
      { label: "Email", value: site.links.email },
      { label: "LinkedIn", value: "in/tanaykashyap" },
      { label: "GitHub", value: "TanayKashyap" },
    ],
    cta: "Open Contact",
  },
};
