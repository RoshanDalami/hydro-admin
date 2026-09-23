export type TGalleryCategory = {
  id: number;
  title: string;
  titleNp?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TGalleriesResponse = {
  status: number;
  data: TGalleryCategory[];
  message: string;
  success: string;
};
export type TGalleryByIdResponse = {
  status: number;
  data: TGalleryCategory;
  message: string;
  success: string;
};

export type TCreateGalleryCategoryPayload = {
  title: string;
  titleNp?: string;
};

export type TUpdateGalleryCategoryPayload = {
  id: number;
  title: string;
  titleNp?: string;
};

export type TCreateGalleryCategoryResponse = {
  status: number;
  data: null;
  message: string;
  success: boolean;
};

export type TUpdateGalleryCategoryResponse = {
  status: number;
  data: null;
  message: string;
  success: boolean;
};

export type TDeleteGalleryCategoryResponse = {
  status: number;
  data: null;
  message: string;
  success: boolean;
};
