import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateLogo, GetFirstLogo, UpdateLogo } from "@/api/service/logo.service";
import { toast } from "sonner";

export const LOGO_QUERY_KEY = {
  FIRSTLOGO: "first-logo",
};

export const useCreateLogo = () => {
  return useMutation({
    mutationFn: CreateLogo,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetFirstLogo = () => {
  return useQuery({
    queryKey: [LOGO_QUERY_KEY.FIRSTLOGO],
    queryFn: GetFirstLogo,
  });
};

export const useUpdateLogo = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      UpdateLogo(id, data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
