import type { NextPageWithLayout } from "@/pages/_app";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { HiPlus } from "react-icons/hi";

import { MyInfoField, MyInfoValue, MyInfoModal } from "@/types/users";
import { useUsers } from "@/hooks/useUsers";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import NicknameInput from "@/components/common/AuthInput/NicknameInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import CheckPasswordInput from "@/components/common/AuthInput/CheckPasswordInput";
import AlertModal from "@/components/common/Modal/AlertModal";
import Button from "@/components/common/Button/Button";

const MyInfo: NextPageWithLayout = () => {
  const { data } = useUsers.get();

  const form = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    form.reset({
      profileImageURL: data?.data.profileImageURL,
      nickname: data?.data.nickname,
      email: data?.data.email
    });
  }, [data]);

  const [modal, setModal] = useState<MyInfoModal>({
    modal: useRef<any>(),
    message: ""
  });

  const [imgPreview, setImgPreview] = useState<boolean>(false);

  const { mutate: createImageURL } = useUsers.createImageURL(form.setValue);

  const handleCreateImageUrl = () => {
    
    form.setValue(
      "profileImageURL",
      URL?.createObjectURL(form.getValues("profileImageURL")[0])
    );
    setImgPreview(true);

    const formData = new FormData();
    formData.append("image", form.getValues("profileImageURL")[0]);

    createImageURL(formData);
  };

  const { mutate } = useUsers.edit(modal, setModal);

  const submit = {
    onSubmit: async (value: any) => {
      const body: MyInfoValue = {
        nickname: value.nickname,
        profileImageURL: value.profileImageURL,
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
        <dialog ref={modal.modal}>
          <AlertModal
            type="decide"
            size="decide"
            text={modal.message}
            handlerAlertModal={() => {
              modal.modal.current.close();
            }}
          />
        </dialog>
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
                    {imgPreview && (
                      <Image
                        src={form.getValues("profileImageURL")}
                        alt="profileImage"
                        layout="fill"
                        className="rounded-md"
                      />
                    )}
                    {!imgPreview && (
                      <label htmlFor="profileImage">
                        <HiPlus
                          size={30}
                          color="white"
                          className="absolute top-[55px] left-[55px] hover: cursor-pointer"
                        />
                      </label>
                    )}
                    <input
                      id="profileImage"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/svg"
                      {...form.register("profileImageURL", {
                        onChange: handleCreateImageUrl
                      })}
                      className="h-full w-full opacity-0 hover:cursor-pointer"
                    />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setImgPreview(false);
                      form.setValue("profileImageURL", "");
                    }}
                    className="w-[138px]"
                  >
                    <Button text="초기화" size="full" type="button"></Button>
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
