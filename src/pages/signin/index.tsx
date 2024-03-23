import { useState } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { Signin, ErrorModal } from "@/types/auth";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import AlertModal from "@/components/common/Modal/AlertModal";
import Button from "@/components/common/Button/Button";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<{ email: string; password: string }>({ mode: "onChange" });
  const [modal, setModal] = useState<ErrorModal>({
    modal: false,
    message: ""
  });

  const { mutate } = useAuth.login(setModal);

  const submit = {
    onSubmit: async (value: Signin) => {
      mutate(value);
    },
    onError: (error: any) => {
      console.log(error);
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
            setModal((prev: ErrorModal) => ({ ...prev, modal: !modal.modal }));
          }}
        />
      )}
      <div className="flex-col gap-5 mx-auto pt-[150px] w-[375px] md:w-[632px] lg:w-[640px]">
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
              whatFor="login"
              errors={errors}
              watch={watch}
              register={register}
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <PasswordInput
              whatFor="login"
              errors={errors}
              watch={watch}
              register={register}
            />
          </div>
          <div className="mt-7">
            <Button text="로그인 하기" size="full" type="submit" />
          </div>
        </form>
        <div className="flex justify-center gap-3 text-sm mx-auto mt-8">
          <p>회원이 아니신가요?</p>
          <Link href="signUp" className="underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
