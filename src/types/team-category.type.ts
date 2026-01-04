export type TTeamCategory = {
  id: number;
  title: string;
  isActive: boolean;
};

export type TTeamCategoryResponse = {
  data: TTeamCategory[];
  status: number;
  success: boolean;
  message: string;
};
export type TTeamCategoryByIdResponse = {
  data: TTeamCategory;
  status: number;
  success: boolean;
  message: string;
};

export type TCreateTeamCategoryPayload = {
  title: string;
};
export type TUpdateTeamCategoryPayload = {
  title: string;
  id: number;
};

export type TCreateTeamCategoryResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};
