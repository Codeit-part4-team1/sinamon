import { useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { AuthContext } from "@/contexts/AuthProvider";
import AlertModal from "@/components/common/AlertModal";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import Button from "@/components/common/Button";

const SignIn = () => {
  const router = useRouter();

  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<{ email: string; password: string }>({ mode: "onChange" });

  const [resMessage, setResMessage] = useState<string>("");

  const dialogRef = useRef<any>();

  const submit = {
    onSubmit: async (data: any) => {
      const res = await login(data);

      console.log(res);

      if (res.status === 201) {
        router.push("/");
      } else {
        setResMessage(res.response.data.message);
        dialogRef.current.showModal();
      }
    },
    onError: (error: any) => {
      console.log(error);
    }
  };

  return (
    <div className="relative max-w-[740px] min-w-[375px] mx-auto sm:px-[12px] sm:pt-[100px] md:px-[52px] md:pt-[180px]">
      <dialog ref={dialogRef} className="rounded-lg">
        <AlertModal
          type="alert"
          size="md"
          text={resMessage}
          handlerAlertModal={() => {
            dialogRef.current.close();
          }}
        />
      </dialog>
      <div className="flex-col gap-5 min-w-[280px] mx-auto">
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
