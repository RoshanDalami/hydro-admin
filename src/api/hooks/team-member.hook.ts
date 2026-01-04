import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CreateTeamMember,
  GetTeamMemberById,
  GetTeamMembers,
  UpdateTeamMember,
  DeleteTeamMember,
} from "../service/team-member.service";

export const TEAM_MEMBER_QUERY_KEY = {
  TEAM_MEMBER: "team-member",
  TEAM_MEMBER_BY_ID: "team-member-by-id",
};

export const useCreateTeamMember = () => {
  return useMutation({
    mutationFn: CreateTeamMember,
  });
};

export const useGetTeamMembers = () => {
  return useQuery({
    queryKey: [TEAM_MEMBER_QUERY_KEY.TEAM_MEMBER],
    queryFn: GetTeamMembers,
  });
};

export const useGetTeamMemberById = (id: number) => {
  return useQuery({
    queryKey: [TEAM_MEMBER_QUERY_KEY.TEAM_MEMBER_BY_ID, id],
    queryFn: () => GetTeamMemberById(id),
    enabled: !!id,
  });
};

export const useUpdateTeamMember = () => {
  return useMutation({
    mutationFn: UpdateTeamMember,
  });
};

export const useDeleteTeamMember = () => {
  return useMutation({
    mutationFn: (id: number) => DeleteTeamMember(id),
  });
};
