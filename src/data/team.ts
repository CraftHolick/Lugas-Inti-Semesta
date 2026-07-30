export interface TeamMember {
  id: string;
  name: string;
  roleId: string;
  roleEn: string;
  roleZh: string;
  avatarUrl: string;
}

// TODO: replace placeholder data with actual team members
export const team: TeamMember[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `team-${i + 1}`,
  name: `Ahli Placeholder ${i + 1}`,
  roleId: `Peran Placeholder ${i + 1}`,
  roleEn: `Role Placeholder ${i + 1}`,
  roleZh: `角色占位符 ${i + 1}`,
  avatarUrl: `/images/team-placeholder.jpg`,
}));
