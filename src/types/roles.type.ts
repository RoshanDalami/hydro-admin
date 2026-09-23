export type TRole = {
  id: number;
  title: string;
  titleNp?: string;
  isActive: boolean;
};

export type TRoleResponse = {
  data: TRole[];
  status: number;
  success: boolean;
  message: string;
};

export type TCreateRolePayload = {
  title: string;
  titleNp?: string;
};
export type TUpdateRolePayload = {
  id: number;
  title: string;
  titleNp?: string;
};

export type TCreateRoleResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};
