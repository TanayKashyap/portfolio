export interface SiteLinks {
  email: string;
  linkedin: string;
  github: string;
}

export interface Site {
  name: string;
  role: string;
  tagline: string;
  education: {
    school: string;
    degree: string;
    graduation: string;
    location: string;
  };
  links: SiteLinks;
}

export const site: Site = {
  name: "Tanay Kashyap",
  role: "Data Scientist",
  tagline:
    "BMath Statistics @ University of Waterloo · graduating April 2026",
  education: {
    school: "University of Waterloo",
    degree: "Bachelor of Mathematics | Major in Statistics",
    graduation: "April 2026",
    location: "Waterloo, Ontario",
  },
  links: {
    email: "tanayk03@gmail.com",
    linkedin: "https://linkedin.com/in/tanaykashyap",
    github: "https://github.com/TanayKashyap",
  },
};
