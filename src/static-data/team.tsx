import { Team } from "@/types/team";

export const teamData: Team[] = [
  {
    id: crypto.randomUUID(),
    name: "Rati Janashi",
    designation: "Project Manager",
    image: "/images/team/image-1.webp",
    socialLinks: [
      {
        id: crypto.randomUUID(),
        name: "Facebook",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Twitter",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Linkedin",
        link: "/"
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    name: "Sophia Martinez",
    designation: "Sales Manager",
    image: "/images/team/image-2.webp",
    socialLinks: [
      {
        id: crypto.randomUUID(),
        name: "Facebook",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Twitter",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Linkedin",
        link: "/"
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    name: "Marcus Johnson",
    designation: "Operations Manager",
    image: "/images/team/image-3.webp",
    socialLinks: [
      {
        id: crypto.randomUUID(),
        name: "Facebook",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Twitter",
        link: "/"
      },
      {
        id: crypto.randomUUID(),
        name: "Linkedin",
        link: "/"
      }
    ]
  }
];
