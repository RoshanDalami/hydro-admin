import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CreateActivities,
  GetActivities,
  GetActivitiesById,
  DeleteActivitiesById,
  DeleteActivityImage,
  UpdateActivities,
} from "../service/activities.service";
import { toast } from "sonner";
export const ACTIVITIES_QUERY_KEY = {
  ALL: "activities",
  BY_ID: "activities-by-id",
};

export const useCreateActivities = () => {
  return useMutation({
    mutationFn: CreateActivities,
    onSuccess: (data) => {
      toast.success(data.message || "Activity created successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create activity");
    },
  });
};

export const useGetActivities = () => {
  return useQuery({
    queryKey: [ACTIVITIES_QUERY_KEY.ALL],
    queryFn: GetActivities,
  });
};

export const useGetActivitiesById = (id: number) => {
  return useQuery({
    queryKey: [ACTIVITIES_QUERY_KEY.BY_ID, id],
    queryFn: () => GetActivitiesById(id),
    enabled: false,
  });
};

export const useDeleteActivitiesById = () => {
  return useMutation({
    mutationFn: (id: number) => DeleteActivitiesById(id),
  });
};

export const useDeleteActivityImage = () => {
  return useMutation({
    mutationFn: (id: number) => DeleteActivityImage(id),
  });
};

export const useUpdateActivities = () => {
  return useMutation({
    mutationFn: UpdateActivities,
  });
};
