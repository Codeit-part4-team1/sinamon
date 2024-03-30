import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { SignUp, Modal, SignUpRequest, SignUpModal } from "@/types/auth";
import { getCookie } from "@/utils/cookie";

export const useUsers = {
  get: () =>
    useQuery({
      queryKey: ["user"],
      queryFn: () => instance.get("/users/me"),
      enabled: !!getCookie("accessToken")
    }),

  signUp: (modal: any, setModal: any) =>
    useMutation({
      mutationFn: (value: SignUpRequest) => instance.post("/users", value),
      onSuccess: () => {
        setModal((prev: SignUpModal) => ({
          ...prev,
          message: "가입이 완료되었습니다!"
        }));
        modal.success.current.showModal();
      },
      onError: (err: any) => {
        setModal((prev: SignUpModal) => ({
          ...prev,
          message: err.response.data.message
        }));
        modal.fail.current.showModal();
      }
    })
};
