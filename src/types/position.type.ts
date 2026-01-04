export type TPosition = {
  id: number;
  title: string;
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
};
export type TUpdatePositionPayload = {
  id: number;
  title: string;
};

export type TCreatePositionResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};
