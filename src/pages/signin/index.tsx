import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import { useLogin } from "@/hooks/auth";
import { SignInModal } from "@/types/auth";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import AlertModal from "@/components/common/Modal/AlertModal";
import Button from "@/components/common/Button/Button";

import { Moon, Sun } from "lucide-react";

const SignIn = () => {
  const { theme, setTheme } = useTheme();

  const form = useForm({ mode: "onChange" });

  const [modal, setModal] = useState<SignInModal>({
    fail: useRef<any>(),
    size: "sm",
    message: ""
  });

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 768
        ? setModal((prev: SignInModal) => ({ ...prev, size: "sm" }))
        : setModal((prev: SignInModal) => ({ ...prev, size: "md" }));
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const { mutate } = useLogin(modal, setModal);

  const submit = {
    onSubmit: async (value: any) => {
      mutate(value);
    },
    onError: async () => {
      undefined;
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <div className="relative h-full min-w-[375px]">
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
          <div className="flex-col gap-5 mx-auto w-full pt-[80px] pb-[50px] px-[15px] md:w-[632px] md:pt-[150px] lg:w-[640px]">
            <div>
              <Image
                src="/images/logo.png"
                alt="logo"
                width={300}
                height={94}
                priority
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
                <EmailInput whatFor="login" />
              </div>
              <div className="relative flex flex-col gap-1">
                <PasswordInput whatFor="login" />
              </div>
              <div className="mt-7">
                <Button text="로그인 하기" size="full" type="submit" />
              </div>
            </form>
            <div className="flex justify-center gap-3 text-sm mx-auto mt-8">
              <p>회원이 아니신가요?</p>
              <Link href="signup" className="underline">
                회원가입하기
              </Link>
            </div>
          </div>
        </div>
      </FormProvider>
      <button
        className="fixed right-12 bottom-12 w-10 h-10 flex justify-center items-center rounded border border-white-ffffff bg-black"
        type="button"
        onClick={
          theme === "dark" ? () => setTheme("light") : () => setTheme("dark")
        }
      >
        <Sun className="text-white-ffffff hidden dark:block" />
        <Moon className="text-white-ffffff block dark:hidden" />
      </button>
    </div>
  );
};

export default SignIn;
