import Router from "next/router";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { Signin, ErrorModal } from "@/types/auth";
import { removeCookie, setCookie } from "@/utils/cookie";

export const useAuth = {
  login: (setResMessage: any, dialogRef: any) =>
    useMutation({
      mutationFn: (value: Signin) => instance.post("/auth/login", value),
      onSuccess(data) {
        const { accessToken, refreshToken } = data.data;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        Router.push("/");
      },
      onError(err: any) {
        setResMessage(err.response.data.message);
        dialogRef.current.showModal();
      }
    }),
  logout: () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    Router.push("/").then(() => {
      window.location.reload();
    })
  }
};
