import type { NextPageWithLayout } from "@/pages/_app";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { HiPlus } from "react-icons/hi";

import { MyInfoRequest, MyInfoModal } from "@/types/users";
import { useUsers } from "@/hooks/useUsers";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import NicknameInput from "@/components/common/AuthInput/NicknameInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import CheckPasswordInput from "@/components/common/AuthInput/CheckPasswordInput";
import AlertModal from "@/components/common/Modal/AlertModal";
import Button from "@/components/common/Button/Button";
import NotificationModal from "@/components/common/Modal/NotificationModal";

const MyInfo: NextPageWithLayout = () => {
  const { data } = useUsers.get();

  const form = useForm({
    mode: "onChange"
  });

  const [modal, setModal] = useState<MyInfoModal>({
    success: useRef<any>(),
    fail: useRef<any>(),
    message: ""
  });

  useEffect(() => {
    form.reset({
      profileImageUrl: data?.data.profileImageUrl,
      nickname: data?.data.nickname,
      email: data?.data.email
    });
  }, [data]);

  const { mutate: createImageUrl } = useUsers.createImageUrl(form.setValue);
  const { mutate } = useUsers.edit(modal, setModal);

  const handleCreateImageUrl = () => {
    const formData = new FormData();
    formData.append("image", form.getValues("profileImageUrl")[0]);

    createImageUrl(formData);
  };

  const submit = {
    onSubmit: async (value: any) => {
      console.log(value);
      const body: MyInfoRequest = {
        nickname: value.nickname,
        profileImageUrl: value.profileImageUrl,
        newPassword: value.newPassword
      };
      mutate(body);
    },
    onError: async () => {
      undefined;
    }
  };

  return (
    <FormProvider {...form}>
      <div className="relative max-w-[930px]">
        <dialog ref={modal.success}>
          <AlertModal
            type="alert"
            size="sm"
            text={modal.message}
            handlerAlertModal={() => {
              window.location.reload();
            }}
          />
        </dialog>
        <dialog ref={modal.fail}>
          <AlertModal
            type="alert"
            size="sm"
            text={modal.message}
            handlerAlertModal={() => {
              modal.fail.current.close();
            }}
          />
        </dialog>
        <NotificationModal />
        <div className="mx-auto pt-[20px] md:pt-[50px]">
          <div className="flex-col gap-5 mx-auto">
            <form
              onSubmit={form.handleSubmit(submit.onSubmit, submit.onError)}
              className="flex flex-col gap-5 md:gap-10"
            >
              <h1 className="text-[28px] font-bold">내 정보</h1>
              <div className="flex flex-col items-center gap-10 pt-[15px] md:pt-[0px] md:flex-row">
                <div className="relative flex flex-col gap-5 items-center">
                  <div className="relative border rounded-md bg-gray-300 h-[140px] w-[140px]">
                    {form.getValues("profileImageUrl") ? (
                      <Image
                        src={form.getValues("profileImageUrl")}
                        alt="profileImage"
                        layout="fill"
                        className="rounded-md"
                      />
                    ) : (
                      <>
                        <label htmlFor="profileImage">
                          <HiPlus
                            size={30}
                            color="white"
                            className="absolute top-[55px] left-[55px] hover: cursor-pointer"
                          />
                        </label>
                        <input
                          id="profileImage"
                          type="file"
                          accept="image/*"
                          {...form.register("profileImageUrl", {
                            onChange: handleCreateImageUrl
                          })}
                          className="h-full w-full opacity-0 hover:cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      form.setValue("profileImageUrl", "");
                      const formData = new FormData();
                      formData.append("profileImageUrl", "");
                      createImageUrl(formData);
                    }}
                    className="w-[138px]"
                  >
                    <Button text="초기화" size="full" type="button" />
                  </div>
                </div>

                <div className="relative flex flex-col gap-5 md:translate-y-[18px] w-full">
                  <div>
                    <NicknameInput />
                  </div>
                  <div>
                    <EmailInput whatFor="edit" />
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col gap-5">
                <div>
                  <PasswordInput whatFor="edit" />
                </div>
                <div>
                  <CheckPasswordInput whatFor="edit" />
                </div>
                <div className="flex justify-end pt-[20px]">
                  <Button text="저장하기" size="lg" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

MyInfo.getLayout = function getLayout(page: ReactNode) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default MyInfo;