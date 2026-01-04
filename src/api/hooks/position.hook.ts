import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CreatePosition,
  GetPositions,
  GetPositionById,
  UpdatePosition,
  DeletePosition,
} from "../service/position.service";

export const POSITION_QUERY_KEY = {
  ALL: "positions",
  BY_ID: "position-by-id",
};

export const useCreatePosition = () => {
  return useMutation({
    mutationFn: CreatePosition,
  });
};

export const useGetPositions = () => {
  return useQuery({
    queryKey: [POSITION_QUERY_KEY.ALL],
    queryFn: () => GetPositions(),
  });
};

export const useGetPositionById = (id: number) => {
  return useQuery({
    queryKey: [POSITION_QUERY_KEY.BY_ID, id],
    queryFn: () => GetPositionById(id),
    enabled: !!id,
  });
};

export const useUpdatePosition = () => {
  return useMutation({
    mutationFn: UpdatePosition,
  });
};

export const useDeletePosition = () => {
  return useMutation({
    mutationFn: (id: number) => DeletePosition(id),
  });
};
