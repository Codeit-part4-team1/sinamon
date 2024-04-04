import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { SignUpRequest, SignUpModal } from "@/types/auth";
import { MyInfoRequest, MyInfoModal } from "@/types/users";
import { getCookie } from "@/utils/cookie";
import { queryKey } from "@/constants/queryKeys";

export const useUsers = {
  get: () =>
    useQuery({
      queryKey: queryKey.usersMe,
      queryFn: () => instance.get("/users/me"),
      enabled: !!getCookie("refreshToken")
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
    }),
  edit: (modal: MyInfoModal, setModal: any) =>
    useMutation({
      mutationFn: (value: MyInfoRequest) => {
        return instance.patch("/users/me", value);
      },
      onSuccess: () => {
        setModal((prev: MyInfoModal) => ({
          ...prev,
          message: "수정되었습니다"
        }));
        modal.success.current.showModal();
      },
      onError: (err: any) => {
        setModal((prev: MyInfoModal) => ({
          ...prev,
          message: "프로필 이미지를 등록해 주세요"
        }));
        modal.fail.current.showModal();
      }
    }),
  createImageUrl: (setValue: any) =>
    useMutation({
      mutationFn: (value: any) =>
        instance.post("/users/me/image", value, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }),
      onSuccess: (response: any) => {
        setValue("profileImageUrl", response.data.profileImageUrl);
      }
    })
};
