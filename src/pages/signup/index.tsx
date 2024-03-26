import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { SignUp, Modal } from "@/types/auth";
import { useUsers } from "@/hooks/useUsers";
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
  const [modal, setModal] = useState<Modal>({
    size: "sm",
    message: ""
  });

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 768
        ? setModal((prev: Modal) => ({ ...prev, size: "sm" }))
        : setModal((prev: Modal) => ({ ...prev, size: "md" }));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { mutate } = useUsers.signUp(setModal, dialog.success, dialog.fail);

  const submit = {
    onSubmit: (value: any) => {
      const body: SignUp = {
        email: value.email,
        nickname: value.nickname,
        password: value.password
      };
      console.log(value);
      console.log(body);
      mutate(body);
    },
    onError: () => {
      undefined;
    }
  };

  return (
    <div className="relative h-full min-w-[375px]">
      <dialog ref={dialog.success} className="rounded-lg">
        <AlertModal type="alert" size={modal.size} text={modal.message} />
      </dialog>
      <dialog ref={dialog.fail} className="rounded-lg">
        <AlertModal
          type="alert"
          size={modal.size}
          text={modal.message}
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
