import { apiUrls } from "../apiUrl";
import { mainApiWrapper } from "../apiHelper";
import {
  TAboutUsCreateResponse,
  TAboutUsGetResponse,
  TAboutUsPayload,
  TAboutUsByIdResponse,
  TAboutUsUpdatePayload,
} from "../../types/about-us.type";
export const CreateAboutUs = async (
  data: TAboutUsPayload
): Promise<TAboutUsCreateResponse> => {
  const response = await mainApiWrapper(
    apiUrls.about.create.method,
    apiUrls.about.create.url,
    data
  );
  return response;
};

export const GetAboutUs = async () => {
  const response: TAboutUsGetResponse = await mainApiWrapper(
    apiUrls.about.get.method,
    apiUrls.about.get.url
  );
  return response?.data;
};

export const GetAboutUsById = async (id: number) => {
  const response: TAboutUsByIdResponse = await mainApiWrapper(
    apiUrls.about.getById.method,
    apiUrls.about.getById.url + `/${id}`
  );
  return response.data;
};

export const UpdateAboutUs = async (data: TAboutUsUpdatePayload) => {
  const response: TAboutUsCreateResponse = await mainApiWrapper(
    apiUrls.about.patch.method,
    apiUrls.about.patch.url,
    data
  );
  return response;
};

export const DeleteAboutUsById = async (id: number) => {
  const response: TAboutUsCreateResponse = await mainApiWrapper(
    apiUrls.about.deleteById.method,
    apiUrls.about.deleteById.url + `/${id}`
  );
  return response;
};
