import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { SignUpValue, SignUpModal } from "@/types/auth";
import { MyInfoValue, MyInfoModal } from "@/types/users";

export const useUsers = {
  get: () =>
    useQuery({
      queryKey: ["user"],
      queryFn: () => instance.get("/users/me")
    }),

  signUp: (setModal: any, successDialog: any, failDialog: any) =>
    useMutation({
      mutationFn: (value: SignUpValue) => instance.post("/users", value),
      onSuccess: () => {
        setModal((prev: SignUpModal) => ({
          ...prev,
          message: "가입이 완료되었습니다!"
        }));
        successDialog.current.showModal();
      },
      onError: (err: any) => {
        setModal((prev: SignUpModal) => ({
          ...prev,
          message: err.response.data.message
        }));
        failDialog.current.showModal();
      }
    }),
  edit: (modal: MyInfoModal, setModal: any) =>
    useMutation({
      mutationFn: (value: MyInfoValue) => {
        console.log(value);
        return instance.patch("/users/me", value);
      },
      onSuccess: () => {
        setModal((prev: MyInfoModal) => ({
          ...prev,
          message: "수정되었습니다"
        }));
        modal.modal.current.showModal();
      },
      onError: (err: any) => {
        setModal((prev: MyInfoModal) => ({
          ...prev,
          message: "수정에 실패했습니다"
        }));
        modal.modal.current.showModal();
        console.log(err);
      }
    }),
  createImageURL: (setValue: any) =>
    useMutation({
      mutationFn: (value: any) =>
        instance.post("/users/me/image", value, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }),
      onSuccess: (response: any) => {
        setValue("profileImageURL", response.data.profileImageUrl);
      },
      onError: (err: any) => {
        console.log(err);
      }
    })
};
