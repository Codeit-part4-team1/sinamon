import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { AuthContext } from "@/contexts/AuthProvider";
import AlertModal from "@/components/common/Modal/AlertModal";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import NicknameInput from "@/components/common/AuthInput/NicknameInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import CheckPasswordInput from "@/components/common/AuthInput/CheckPasswordInput";
import Button from "@/components/common/Button/Button";

type ModalType = {
  modal: boolean;
  message: string;
};

type SubmitType = {
  email?: string;
  password?: string;
};

const SignUp = () => {
  const { join } = useContext(AuthContext);
  const router = useRouter();
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
    onSubmit: async (data: SubmitType): Promise<any> => {
      const res = await join(data);

      if (res.status === 201) {
        router.push("signIn");
      } else {
        setModal((prev: ModalType) => ({
          ...prev,
          modal: !modal.modal,
          message: res.response.data.message
        }));
      }
    },
    onError: async (error: any) => {
      undefined;
    }
  };

  return (
    <div className="relative w-screen h-screen min-w-[420px]">
      {modal.modal && (
        <AlertModal
          type="alert"
          size="md"
          text={modal.message}
          handlerAlertModal={() => {
            setModal((prev: ModalType) => ({ ...prev, modal: !modal.modal }));
          }}
        />
      )}
      <div className="flex-col gap-5 mx-auto pt-[90px] w-[375px] md:w-[632px] lg:w-[640px]">
        <div>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={300}
            height={100}
            className="m-auto"
          />
        </div>
        <form
          onSubmit={handleSubmit(submit.onSubmit, submit.onError)}
          className="flex flex-col gap-3 mt-10"
        >
          <div>
            <EmailInput
              whatFor="signUp"
              errors={errors}
              watch={watch}
              register={register}
            />
          </div>
          <div>
            <NicknameInput
              whatFor="signUp"
              errors={errors}
              watch={watch}
              register={register}
            />
          </div>
          <div>
            <PasswordInput
              whatFor="signUp"
              errors={errors}
              watch={watch}
              register={register}
            />
          </div>
          <div>
            <CheckPasswordInput
              whatFor="signUp"
              errors={errors}
              watch={watch}
              register={register}
            />
          </div>
          <div className="mt-7">
            <Button text="회원가입 하기" size="full" type="submit"></Button>
          </div>
          <div className="flex justify-center gap-3 text-sm mx-auto mt-8">
            <p>회원이신가요?</p>
            <Link href="signIn" className="underline">
              로그인하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
