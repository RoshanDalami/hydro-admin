export type TLoginPayload = {
  email: string;
  password: string;
};
export type TUser = {
  id: string;
  username: string;
  email: string;
  role: string;
};
export type TResponseData = {
  token: string;
  user: TUser;
};

export type TLoginResponse = {
  status: number;
  success: boolean;
  message: string;
  data: TResponseData;
};
