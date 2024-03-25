export interface Join {
  email: string;
  nickname: string;
  password: string; 
}

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { JoinData, validateJoinData } from "@/types/joinTypes";
import { useJoin } from "@/hooks/useJoin";
import AlertModal from "@/components/common/Modal/AlertModal";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import NicknameInput from "@/components/common/AuthInput/NicknameInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import CheckPasswordInput from "@/components/common/AuthInput/CheckPasswordInput";
import Button from "@/components/common/Button/Button";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: "onChange" });
  const dialog = {
    success: useRef<any>(),
    fail: useRef<any>()
  };
  const [modalSize, setModalSize] = useState<"md" | "sm" | "decide">("sm");
  const [resMessage, setResMessage] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 768 ? setModalSize("sm") : setModalSize("md");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { mutate } = useJoin.join(setResMessage, dialog.success, dialog.fail);

  const submit = {
    onSubmit: async (value: validateJoinData) => {
      const body: JoinData = {
        email: value.email,
        nickname: value.nickname,
        password: value.password
      }
      mutate(body)
    },
    onError: async () => {
      undefined;
    }
  };

  return (
    <div className="relative h-full min-w-[375px]">
      <dialog ref={dialog.success} className="rounded-lg">
        <AlertModal type="alert" size={modalSize} text={resMessage} />
      </dialog>
      <dialog ref={dialog.fail} className="rounded-lg">
        <AlertModal
          type="alert"
          size={modalSize}
          text={resMessage}
          handlerAlertModal={() => {
            dialog.fail.current.close();
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
              router.push("/");
            }}
            className="m-auto hover:cursor-pointer"
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
            <Link href="signin" className="underline">
              로그인하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
