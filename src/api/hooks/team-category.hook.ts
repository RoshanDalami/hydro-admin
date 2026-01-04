import { useQuery, useMutation } from "@tanstack/react-query";

import {
  CreateTeamCategory,
  GetTeamCategories,
  GetTeamCategoryById,
  UpdateTeamCategory,
  DeleteTeamCategory,
  
} from "@/api/service/team-category.service";

export const TEAM_CATEGORY_QUERY_KEY = {
  ALL: "team-categories",
  BY_ID: "team-category-by-id",
};

export const useCreateTeamCategory = () => {
  return useMutation({
    mutationFn: CreateTeamCategory,
  });
};

export const useGetTeamCategories = () => {
  return useQuery({
    queryKey: [TEAM_CATEGORY_QUERY_KEY.ALL],
    queryFn: () => GetTeamCategories(),
  });
};

export const useGetTeamCategoryById = (id: number) => {
  return useQuery({
    queryKey: [TEAM_CATEGORY_QUERY_KEY.BY_ID, id],
    queryFn: () => GetTeamCategoryById(id),
    enabled: !!id,
  });
};

export const useUpdateTeamCategory = () => {
  return useMutation({
    mutationFn: UpdateTeamCategory,
  });
};

export const useDeleteTeamCategory = () => {
  return useMutation({
    mutationFn: (id: number) => DeleteTeamCategory(id),
  });
};
