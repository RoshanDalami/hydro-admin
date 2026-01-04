import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../service/auth.service";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: LoginService,
    onSuccess: (data) => {
      Cookies.set("token", data.data.token);
      router.push("/activities");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
