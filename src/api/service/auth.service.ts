import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";
import { TLoginPayload, TLoginResponse } from "../../types/auth.type";

export const LoginService = async (data: TLoginPayload) => {
  const response: TLoginResponse = await mainApiWrapper(
    apiUrls.auth.login.method,
    apiUrls.auth.login.url,
    data
  );
  return response;
};
