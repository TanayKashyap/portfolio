export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
}

/**
 * Intentionally empty for now — the Projects section renders a designed
 * empty state until entries are added here.
 */
export const projects: Project[] = [];
