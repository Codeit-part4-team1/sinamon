import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";

import { SignUpField, SignUpValue, SignUpModal } from "@/types/auth";
import { useUsers } from "@/hooks/useUsers";
import AlertModal from "@/components/common/Modal/AlertModal";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import NicknameInput from "@/components/common/AuthInput/NicknameInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import CheckPasswordInput from "@/components/common/AuthInput/CheckPasswordInput";
import Button from "@/components/common/Button/Button";

const SignUp = () => {
  const form = useForm({ mode: "onChange" });

  const [modal, setModal] = useState<SignUpModal>({
    success: useRef<any>(),
    fail: useRef<any>(),
    size: "sm",
    message: ""
  });

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 768
        ? setModal((prev: SignUpModal) => ({ ...prev, size: "sm" }))
        : setModal((prev: SignUpModal) => ({ ...prev, size: "md" }));
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const { mutate } = useUsers.signUp(setModal, modal.success, modal.fail);

  const submit = {
    onSubmit: (value: any) => {
      const body: SignUpValue = {
        email: value.email,
        nickname: value.nickname,
        password: value.password
      };
      mutate(body);
    },
    onError: () => {
      undefined;
    }
  };

  return (
    <FormProvider {...form}>
      <div className="relative h-full min-w-[375px]">
        <dialog ref={modal.success} className="rounded-lg">
          <AlertModal type="alert" size={modal.size} text={modal.message} />
        </dialog>
        <dialog ref={modal.fail} className="rounded-lg">
          <AlertModal
            type="alert"
            size={modal.size}
            text={modal.message}
            handlerAlertModal={() => {
              modal.fail.current.close();
            }}
          />
        </dialog>
        <div className="flex-col gap-5 mx-auto w-full pt-[80px] pb-[50px] px-[15px] md:w-[632px] md:pt-[110px] lg:w-[640px]">
          <div>
            <Image
              src="/images/logo.png"
              alt="logo"
              width={300}
              height={100}
              onClick={() => {
                Router.push("/");
              }}
              className="m-auto hover:cursor-pointer"
            />
          </div>
          <form
            onSubmit={form.handleSubmit(submit.onSubmit, submit.onError)}
            className="flex flex-col gap-3 mt-10"
          >
            <div>
              <EmailInput whatFor="signUp" />
            </div>
            <div>
              <NicknameInput />
            </div>
            <div>
              <PasswordInput whatFor="signUp" />
            </div>
            <div>
              <CheckPasswordInput whatFor="signUp" />
            </div>
            <div className="mt-7">
              <Button text="회원가입 하기" size="full" type="submit"></Button>
            </div>
            <div className="flex justify-center gap-3 text-sm mx-auto mt-8">
              <p>회원이신가요?</p>
              <Link href="signin" className="underline">
                로그인하기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default SignUp;
