import { apiUrls } from "../apiUrl";
import { mainApiWrapper } from "../apiHelper";
import {
  TCreatePositionPayload,
  TCreatePositionResponse,
  TPositionResponse,
  TUpdatePositionPayload,
} from "@/types/position.type";

export const CreatePosition = async (payload: TCreatePositionPayload[]) => {
  const response: TCreatePositionResponse = await mainApiWrapper(
    apiUrls.position.create.method,
    apiUrls.position.create.url,
    payload
  );
  return response;
};

export const GetPositions = async () => {
  const response: TPositionResponse = await mainApiWrapper(
    apiUrls.position.get.method,
    apiUrls.position.get.url
  );
  return response?.data;
};

export const UpdatePosition = async (payload: TUpdatePositionPayload) => {
  const response = await mainApiWrapper(
    apiUrls.position.update.method,
    apiUrls.position.update.url,
    payload
  );
  return response;
};

export const DeletePosition = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.position.deleteById.method,
    apiUrls.position.deleteById.url + `/${id}`
  );
  return response;
};

export const GetPositionById = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.position.getById.method,
    apiUrls.position.getById.url + `/${id}`
  );
  return response;
};
