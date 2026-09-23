export type TPosition = {
  id: number;
  title: string;
  titleNp?: string;
  isActive: boolean;
};

export type TPositionResponse = {
  data: TPosition[];
  status: number;
  success: boolean;
  message: string;
};

export type TCreatePositionPayload = {
  title: string;
  titleNp?: string;
};
export type TUpdatePositionPayload = {
  id: number;
  title: string;
  titleNp?: string;
};

export type TCreatePositionResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};
