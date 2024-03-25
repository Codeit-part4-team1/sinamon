import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { JoinData } from "@/types/joinTypes";

export const useJoin = {
  join: (setResMessage: any, successDialog: any, failDialog: any) =>
    useMutation({
      mutationFn: (value: JoinData) => instance.post("users", value),
      onSuccess: (data: any) => {
        setResMessage(data.response.data.message);
        successDialog.current.showModal();
      },
      onError: (err: any) => {
        setResMessage(err.response.data.message);
        failDialog.current.showModal();
      }
    })
};