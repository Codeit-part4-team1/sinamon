import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";

import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";

import { AuthContext } from "@/contexts/AuthProvider";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import NicknameInput from "@/components/common/AuthInput/NicknameInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import CheckPasswordInput from "@/components/common/AuthInput/CheckPasswordInput";
import AlertModal from "@/components/common/AlertModal";
import Button from "@/components/common/Button";

type ModalType = {
  modal: boolean;
  message: string;
};

const MyInfo: NextPageWithLayout = () => {
  const { updateUserInfo } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: "onChange" });
  const [modal, setModal] = useState<ModalType>({
    modal: false,
    message: ""
  });

  const submit = {
    onSubmit: async (data: any): Promise<any> => {
      setModal((prev: any) => ({
        ...prev,
        modal: !modal.modal,
        message: "hello"
      }));
    },
    onError: async (error: any) => {
      setModal((prev: any) => ({
        ...prev,
        modal: !modal.modal,
        message: "hello"
      }));
    }
  };

  return (
    <div className="relative max-w-[930px]">
      {modal.modal && (
        <AlertModal
          type="decide"
          size="md"
          text={modal.message}
          handlerAlertModal={() => {
            setModal((prev: ModalType) => ({ ...prev, modal: !modal.modal }));
          }}
        />
      )}
      <div className="mx-auto sm:pt-[20px] md:pt-[50px]">
        <div className="flex-col gap-5 mx-auto">
          <form
            onSubmit={handleSubmit(submit.onSubmit, submit.onError)}
            className="flex flex-col gap-5 md:gap-10"
          >
            <h1 className="text-[28px] font-bold">내 정보</h1>
            <div className="flex flex-col items-center gap-10 sm:pt-[15px] md:pt-[0px] md:flex-row">
              <div className="relative flex flex-col gap-5 items-center">
                <input
                  type="file"
                  className="border rounded-md bg-gray-200 h-[140px] w-[140px]"
                />
                <HiPlus
                  width={50}
                  height={50}
                  className="absolute top-[63px] left-[63px] hover: cursor-pointer"
                />
                <Button text="초기화" size="full" type="button"></Button>
              </div>
              <div className="relative flex flex-col gap-5 md:translate-y-[18px] w-full">
                <div>
                  <NicknameInput
                    whatFor="edit"
                    errors={errors}
                    watch={watch}
                    register={register}
                  />
                </div>
                <div>
                  <EmailInput
                    whatFor="edit"
                    errors={errors}
                    watch={watch}
                    register={register}
                  />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col gap-5">
              <div>
                <PasswordInput
                  whatFor="edit"
                  errors={errors}
                  watch={watch}
                  register={register}
                />
              </div>
              <div>
                <CheckPasswordInput
                  whatFor="edit"
                  errors={errors}
                  watch={watch}
                  register={register}
                />
              </div>
              <div className="flex justify-end pt-[20px]">
                <Button text="저장하기" size="lg" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

MyInfo.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default MyInfo;
