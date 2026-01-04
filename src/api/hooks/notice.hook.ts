import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CreateNotice,
  GetNoticeById,
  GetNotices,
  UpdateNotice,
  DeleteNotice,
} from "../service/notice.service";

export const NOTICE_QUERY_KEY = {
  ALL: "notices",
  GET_BY_ID: "notice-by-id",
};

export const useCreateNotice = () => {
  return useMutation({
    mutationFn: CreateNotice,
  });
};

export const useGetNotices = () => {
  return useQuery({
    queryKey: [NOTICE_QUERY_KEY.ALL],
    queryFn: GetNotices,
  });
};

export const useGetNoticeById = (id: number) => {
  return useQuery({
    queryKey: [NOTICE_QUERY_KEY.GET_BY_ID, id],
    queryFn: () => GetNoticeById(id),
  });
};

export const useUpdateNotice = () => {
  return useMutation({
    mutationFn: UpdateNotice,
  });
};

export const useDeleteNotice = () => {
  return useMutation({
    mutationFn: (id: number) => DeleteNotice(id),
  });
};
