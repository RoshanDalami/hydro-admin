import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";
import {
  TCreateTeamCategoryResponse,
  TTeamCategoryResponse,
  TCreateTeamCategoryPayload,
  TTeamCategoryByIdResponse,
  TUpdateTeamCategoryPayload,
} from "@/types/team-category.type";
export const CreateTeamCategory = async (
  payload: TCreateTeamCategoryPayload[]
) => {
  const response: TCreateTeamCategoryResponse = await mainApiWrapper(
    apiUrls.teamCategory.create.method,
    apiUrls.teamCategory.create.url,
    payload
  );
  return response;
};

export const GetTeamCategories = async () => {
  const response: TTeamCategoryResponse = await mainApiWrapper(
    apiUrls.teamCategory.get.method,
    apiUrls.teamCategory.get.url
  );
  return response?.data;
};

export const GetTeamCategoryById = async (id: number) => {
  const response: TTeamCategoryByIdResponse = await mainApiWrapper(
    apiUrls.teamCategory.getById.method,
    apiUrls.teamCategory.getById.url + `/${id}`
  );
  return response?.data;
};

export const UpdateTeamCategory = async (
  payload: TUpdateTeamCategoryPayload
) => {
  const response = await mainApiWrapper(
    apiUrls.teamCategory.update.method,
    apiUrls.teamCategory.update.url,
    payload
  );
  return response;
};

export const DeleteTeamCategory = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.teamCategory.deleteById.method,
    apiUrls.teamCategory.deleteById.url + `/${id}`
  );
  return response;
};
