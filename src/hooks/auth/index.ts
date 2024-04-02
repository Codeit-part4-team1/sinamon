import Router from "next/router";
import { useMutation } from "@tanstack/react-query";

import { SignInRequest, SignInModal } from "@/types/auth";
import { removeCookie, setCookie } from "@/utils/cookie";
import { login } from "@/api/auth";

export const useLogin = (modal: SignInModal, setModal: any) =>
  useMutation({
    mutationFn: (value: SignInRequest) => login(value),
    onSuccess(data) {
      const { accessToken, refreshToken } = data;
      setCookie("accessToken", accessToken, {
        path: "/"
      });
      setCookie("refreshToken", refreshToken, {
        path: "/"
      });
      Router.push("/");
    },
    onError(err: any) {
      setModal((prev: SignInModal) => ({
        ...prev,
        message: err.response.data.message
      }));
      modal.fail.current.showModal();
    }
  });

export const useLogout = () => {
  removeCookie("refreshToken");
  removeCookie("accessToken");
  Router.push("/").then(() => {
    window.location.reload();
  });
};
