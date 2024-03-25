import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { SignUp, Modal } from "@/types/auth";

export const useUsers = {
  get: () =>
    useQuery({
      queryKey: ["user"],
      queryFn: () => instance.get("/users/me")
    }),
  signUp: (setModal: any, successDialog: any, failDialog: any) =>
    useMutation({
      mutationFn: (value: SignUp) => instance.post("users", value),
      onSuccess: () => {
        setModal((prev: Modal) => ({
          ...prev,
          message: "가입이 완료되었습니다!"
        }));
        successDialog.current.showModal();
      },
      onError: (err: any) => {
        setModal((prev: Modal) => ({
          ...prev,
          message: err.response.data.message
        }));
        failDialog.current.showModal();
      }
    })
};
