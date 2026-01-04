import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CreateRole,
  GetRoles,
  UpdateRole,
  DeleteRole,
  GetRoleById,
} from "../service/roles.service";

export const ROLES_QUERY_KEY = {
  ALL: "roles",
  BY_ID: "role-by-id",
};

export const useCreateRole = () => {
  return useMutation({
    mutationFn: CreateRole,
  });
};

export const useGetRoles = () => {
  return useQuery({
    queryKey: [ROLES_QUERY_KEY.ALL],
    queryFn: () => GetRoles(),
  });
};

export const useGetRoleById = (id: number) => {
  return useQuery({
    queryKey: [ROLES_QUERY_KEY.BY_ID, id],
    queryFn: () => GetRoleById(id),
    enabled: !!id,
  });
};

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: UpdateRole,
  });
};

export const useDeleteRole = () => {
  return useMutation({
    mutationFn: (id: number) => DeleteRole(id),
  });
};
