export interface Team {
  id: number;
  name: string;
  members_count?: number;
  members?: TeamMember[];
  createdAt?: string;
}

export interface TeamMember {
  userId: number;
  name: string;
  role: 'admin' | 'member' | 'owner';
}

export interface CreateTeamRequest {
  name: string;
}