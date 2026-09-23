export type TTeamCategory = {
  id: number;
  title: string;
  titleNp?: string;
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
  titleNp?: string;
};
export type TUpdateTeamCategoryPayload = {
  title: string;
  titleNp?: string;
  id: number;
};

export type TCreateTeamCategoryResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};
