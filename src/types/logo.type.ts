export type TLogo = {
  id: number;
  url: string;
  name: string;
  slogan: string;
  createdAt: string;
  updatedAt: string;
};
export type TLogoResponse = {
  status: number;
  data: TLogo[];
  message: string;
  success: boolean;
};

export type TLogoFirstResponse = {
  status: number;
  data: TLogo;
  message: string;
  success: boolean;
};

export type TCreateLogoPayload = {
  name: string;
  slogan?: string;
  image: File | null;
};

export type TCreateLogoResponse = {
  status: number;
  data: null;
  message: string;
  success: boolean;
};
