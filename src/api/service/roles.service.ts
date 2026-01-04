import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";

import {
  TCreateRolePayload,
  TCreateRoleResponse,
  TRoleResponse,
  TUpdateRolePayload,
} from "@/types/roles.type";

export const CreateRole = async (payload: TCreateRolePayload[]) => {
  const response: TCreateRoleResponse = await mainApiWrapper(
    apiUrls.role.create.method,
    apiUrls.role.create.url,
    payload
  );
  return response;
};

export const GetRoles = async () => {
  const response: TRoleResponse = await mainApiWrapper(
    apiUrls.role.get.method,
    apiUrls.role.get.url
  );
  return response?.data;
};

export const UpdateRole = async (payload: TUpdateRolePayload) => {
  const response = await mainApiWrapper(
    apiUrls.role.update.method,
    apiUrls.role.update.url,
    payload
  );
  return response;
};

export const DeleteRole = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.role.deleteById.method,
    apiUrls.role.deleteById.url + `/${id}`
  );
  return response;
};

export const GetRoleById = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.role.getById.method,
    apiUrls.role.getById.url + `/${id}`
  );
  return response;
};
