export type TTeamMember = {
  id: number;
  memberName: string;
  positionId: number;
  roleId: number;
  teamCategoryId: number;
  contact: string;
  email: string;
  imageUrl: string;
  isActive: boolean;
  isDeleted: boolean;
  position: string;
  role: string;
  teamCategory: string;
};

export type TTeamMemberResponse = {
  data: TTeamMember[];
  status: number;
  success: boolean;
  message: string;
};

export type TCreateTeamMemberPayload = {
  memberName: string;
  positionId: number;
  roleId: number;
  teamCategoryId: number;
  contact: string;
  email: string;
  image: File[] | null;
};

export type TCreateTeamMemberResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};
