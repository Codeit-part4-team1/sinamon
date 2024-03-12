import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";

import { AuthContext } from "@/contexts/AuthProvider";
import Usermenu from "@/components/common/Usermenu";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import NicknameInput from "@/components/common/AuthInput/NicknameInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import CheckPasswordInput from "@/components/common/AuthInput/CheckPasswordInput";
import AlertModal from "@/components/common/AlertModal";
import Button from "@/components/common/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type ModalType = {
  modal: boolean;
  message: string;
};

const EditMyInfo = () => {
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

  console.log(watch());
  return (
    <div className="relative w-screen h-screen min-w-[420px]">
      <Header />
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
      <div className="lg:flex flex-row lg:justify-between lg:gap-[200px] lg:w-[1230px] mx-auto">
        <div className="sm:hidden md:hidden lg:block lg:pt-[40px]">
          <Usermenu />
        </div>
        <div className="flex-col gap-5 mx-auto pb-[130px] w-[375px] md:w-[736px] md:pt-[40px] lg:w-[800px]">
          <form
            onSubmit={handleSubmit(submit.onSubmit, submit.onError)}
            className="flex flex-col gap-5 pt-[50px] md:gap-10 md:pt-0"
          >
            <h1 className="text-[28px] font-bold">내 정보</h1>
            <div className="flex flex-col items-center gap-10 pt-[20px] md:flex-row md:pt-0">
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
              <div className="relative flex flex-col gap-5 w-full md:justify-end md:translate-y-[18px]">
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
            <div className="relative flex flex-col gap-5 w-full">
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
      <Footer />
    </div>
  );
};

export default EditMyInfo;
