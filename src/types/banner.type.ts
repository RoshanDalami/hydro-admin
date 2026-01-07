export type TBanner = {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TBannerResponse = {
  data: TBanner[];
  status: number;
  success: boolean;
  message: string;
};

export type TBannerByIdResponse = {
  data: TBanner;
  status: number;
  success: boolean;
  message: string;
};

export type TCreateBannerPayload = {
  title: string;
  image: File;
  isActive?: boolean;
};

export type TUpdateBannerPayload = {
  id: number;
  title: string;
  image?: File;
  isActive?: boolean;
};

export type TCreateBannerResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};

export type TUpdateBannerResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};

export type TDeleteBannerResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};
