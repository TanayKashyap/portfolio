export interface Extracurricular {
  organization: string;
  role: string;
  start: string;
  end: string;
  bullets: string[];
}

export const extracurricular: Extracurricular[] = [
  {
    organization: "Data Science Club",
    role: "VP of Education",
    start: "Jan 2025",
    end: "2025",
    bullets: [
      "Developed a novel word cloud method combining statistical term validation, temporal frequency evolution, and semantic embeddings to create richer topic visualizations that help researchers interpret language shifts in large text datasets.",
      "Designed and led a university-wide survey of University of Waterloo students to identify the lowest-effort courses across faculties, collecting and analyzing student responses to highlight patterns in perceived course workload and difficulty.",
      "Served as Technical Program Manager for 5 applied AI projects, coordinating 20+ contributors and guiding teams to build ML solutions for local community-based problems with structured evaluation workflows, ensuring timely delivery of AI prototypes.",
    ],
  },
];
