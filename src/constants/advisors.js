/**
 * advisors.js
 *
 * Static data for all five board members.
 * If you add or change an advisor, this is the only file you need to touch.
 */

import { advisorColors } from "../styles/theme";

export const ADVISORS = [
  {
    id: "vc",
    name: "Marcus Reid",
    title: "Partner at Apex Ventures",
    role: "Ruthless VC",
    initials: "MR",
    ...advisorColors.vc,
  },
  {
    id: "cfo",
    name: "Sandra Voss",
    title: "Former CFO — 3 Successful Exits",
    role: "Skeptical CFO",
    initials: "SV",
    ...advisorColors.cfo,
  },
  {
    id: "growth",
    name: "Dev Patel",
    title: "Growth Lead — 4 Unicorn Companies",
    role: "Growth Hacker",
    initials: "DP",
    ...advisorColors.growth,
  },
  {
    id: "devil",
    name: "Elena Cross",
    title: "Strategic Risk Advisor",
    role: "Devil's Advocate",
    initials: "EC",
    ...advisorColors.devil,
  },
  {
    id: "expert",
    name: "Prof. James Wu",
    title: "PhD — 20yr Industry Veteran",
    role: "Domain Expert",
    initials: "JW",
    ...advisorColors.expert,
  },
];

// Helper to look up an advisor by id without repeating this logic everywhere
export function getAdvisorById(id) {
  return ADVISORS.find((advisor) => advisor.id === id) ?? null;
}
