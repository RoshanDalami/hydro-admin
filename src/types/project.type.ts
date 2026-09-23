export type TProjectImages = {
  id: number;
  projectId: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProject = {
  id: number;
  title: string;
  titleNp?: string | null;
  content: string;
  contentNp?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  projectImages?: TProjectImages[];
};

export type TProjectCreatePayload = {
  title: string;
  titleNp?: string;
  content: string;
  contentNp?: string;
  images?: FileList;
};

export type TProjectCreateResponse = {
  data: null;
  message: string;
  status: number;
  success: boolean;
};

export type TProjectGetResponse = {
  data: TProject[];
  message: string;
  status: number;
  success: boolean;
};
export type TProjectGetByIdResponse = {
  data: TProject;
  message: string;
  status: number;
  success: boolean;
};
