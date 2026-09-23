export type TAboutUs = {
  id: number;
  content: string;
  contentNp: string | null;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TAboutUsPayload = {
  content: string;
  contentNp: string;
};

export type TAboutUsUpdatePayload = {
  id: number;
  content: string;
  contentNp: string;
};

export type TAboutUsCreateResponse = {
  status: number;
  data: null;
  message: string;
  success: boolean;
};

export type TAboutUsGetResponse = {
  status: number;
  data: TAboutUs[];
  message: string;
  success: boolean;
};

export type TAboutUsByIdResponse = {
  status: number;
  data: TAboutUs;
  message: string;
  success: boolean;
};
export type TAboutUsDeleteResponse = {
  status: number;
  data: null;
  message: string;
  success: boolean;
};
