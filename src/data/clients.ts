export interface Client {
  id: string;
  name: string;
  initials: string;
}

export const clients: Client[] = [
  { id: "client-1", name: "PT Jhonlin Baratama", initials: "JB" },
  { id: "client-2", name: "PT Harfa Taruna Mandiri", initials: "HTM" },
  { id: "client-3", name: "PT Golden Kirin Group", initials: "GKG" },
  { id: "client-4", name: "PT Transcoal Minergy", initials: "TM" },
  { id: "client-5", name: "PT Graha Equity Investment", initials: "GEI" },
];
