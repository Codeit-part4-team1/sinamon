import Router from "next/router";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { Signin, ErrorModal } from "@/types/auth";
import { setCookie } from "@/utils/cookie";

export const useAuth = {
  login: (setModal: any) =>
    useMutation({
      mutationFn: (value: Signin) => instance.post("/auth/login", value),
      onSuccess(data) {
        const { accessToken, refreshToken } = data.data;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        Router.push("/");
      },
      onError(err: any) {
        setModal((prev: ErrorModal) => ({
          ...prev,
          modal: (prev: boolean) => !prev,
          message: err.response.data.message
        }));
      }
    })
};
