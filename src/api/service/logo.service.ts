import { apiUrls } from "../apiUrl";
import { mainApiWrapper } from "../apiHelper";
import {
  TCreateLogoResponse,
  TLogoFirstResponse,
} from "@/types/logo.type";
export const CreateLogo = async (payload: FormData) => {
  const response: TCreateLogoResponse = await mainApiWrapper(
    apiUrls.logo.create.method,
    apiUrls.logo.create.url,
    payload
  );
  return response;
};

export const GetFirstLogo = async () => {
  const response: TLogoFirstResponse = await mainApiWrapper(
    apiUrls.logo.getFrist.method,
    apiUrls.logo.getFrist.url
  );
  return response?.data;
};

export const UpdateLogo = async (id: string, payload: FormData) => {
  const response: TCreateLogoResponse = await mainApiWrapper(
    apiUrls.logo.update.method,
    apiUrls.logo.update.url + `/${id}`,
    payload
  );
  return response;
};
