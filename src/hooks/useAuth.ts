import Router from "next/router";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { SignInRequest, SignInModal } from "@/types/auth";
import { removeCookie, setCookie } from "@/utils/cookie";

export const useAuth = {
  login: (modal: SignInModal, setModal: any) =>
    useMutation({
      mutationFn: (value: SignInRequest) => instance.post("/auth/login", value),
      onSuccess(data) {
        const { accessToken, refreshToken } = data.data;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        Router.push("/");
      },
      onError(err: any) {
        setModal((prev: SignInModal) => ({
          ...prev,
          message: err.response.data.message
        }));
        modal.fail.current.showModal();
      }
    }),
  logout: () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    Router.push("/").then(() => {
      window.location.reload();
    });
  }
};
