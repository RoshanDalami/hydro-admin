import {
  CreateAboutUs,
  GetAboutUs,
  GetAboutUsById,
  UpdateAboutUs,
  DeleteAboutUsById,
} from "../service/about-us.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const ABOUT_US_QUERY_KEY = {
  ALL: "about-us",
  BY_ID: "about-us-by-id",
};

export const useCreateAboutUs = () => {
  return useMutation({
    mutationFn: CreateAboutUs,
  });
};

export const useGetAboutUs = () => {
  return useQuery({
    queryKey: [ABOUT_US_QUERY_KEY.ALL],
    queryFn: GetAboutUs,
  });
};

export const useGetAboutUsById = (id: number) => {
  return useQuery({
    queryKey: [ABOUT_US_QUERY_KEY.BY_ID, id],
    queryFn: () => GetAboutUsById(id),
    enabled: false,
  });
};

export const useUpdateAboutUs = () => {
  return useMutation({
    mutationFn: UpdateAboutUs,
  });
};

export const useDeleteAboutUsById = () => {
  return useMutation({
    mutationFn: (id: number) => DeleteAboutUsById(id),
  });
};
