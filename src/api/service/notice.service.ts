import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";
import {
  TCreateNoticeResponse,
  TNoticeByIdResponse,
  TNoticeResponse,
} from "@/types/notice.type";

export const CreateNotice = async (payload: FormData) => {
  const response: TCreateNoticeResponse = await mainApiWrapper(
    apiUrls.notices.create.method,
    apiUrls.notices.create.url,
    payload
  );
  return response;
};

export const GetNotices = async () => {
  const resposne: TNoticeResponse = await mainApiWrapper(
    apiUrls.notices.get.method,
    apiUrls.notices.get.url
  );
  return resposne.data;
};

export const GetNoticeById = async (id: number) => {
  const resposne: TNoticeByIdResponse = await mainApiWrapper(
    apiUrls.notices.getById.method,
    apiUrls.notices.getById.url + `/${id}`
  );
  return resposne?.data;
};

export const UpdateNotice = async (payload: FormData) => {
  const resposne: TCreateNoticeResponse = await mainApiWrapper(
    apiUrls.notices.update.method,
    apiUrls.notices.update.url,
    payload
  );
  return resposne;
};

export const DeleteNotice = async (id: number) => {
  const response: TCreateNoticeResponse = await mainApiWrapper(
    apiUrls.notices.deleteById.method,
    apiUrls.notices.deleteById.url + `/${id}`
  );
  return response;
};
