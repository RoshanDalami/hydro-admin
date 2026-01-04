import { apiUrls } from "../apiUrl";
import { mainApiWrapper } from "../apiHelper";
import {
  TCreateTeamMemberPayload,
  TCreateTeamMemberResponse,
  TTeamMember,
  TTeamMemberResponse,
} from "@/types/team-members.type";

export const CreateTeamMember = async (
  payload: FormData
) => {
  const response: TCreateTeamMemberResponse = await mainApiWrapper(
    apiUrls.teamMember.create.method,
    apiUrls.teamMember.create.url,
    payload
  );
  return response;
};

export const GetTeamMembers = async () => {
  const response: TTeamMemberResponse = await mainApiWrapper(
    apiUrls.teamMember.get.method,
    apiUrls.teamMember.get.url
  );
  return response?.data;
};

export const UpdateTeamMember = async (payload: FormData) => {
  const response = await mainApiWrapper(
    apiUrls.teamMember.update.method,
    apiUrls.teamMember.update.url,
    payload
  );
  return response;
};

export const DeleteTeamMember = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.teamMember.deleteById.method,
    apiUrls.teamMember.deleteById.url + `/${id}`
  );
  return response;
};

export const GetTeamMemberById = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.teamMember.getById.method,
    apiUrls.teamMember.getById.url + `/${id}`
  );
  return response;
};