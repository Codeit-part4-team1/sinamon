import { useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { AuthContext } from "@/contexts/AuthProvider";
import AlertModal from "@/components/common/AlertModal";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import NicknameInput from "@/components/common/AuthInput/NicknameInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import CheckPasswordInput from "@/components/common/AuthInput/CheckPasswordInput";
import Button from "@/components/common/Button";

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

  const [resMessage, setResMessage] = useState<string>("");

  const dialogRef = useRef<any>();

  const submit = {
    onSubmit: async (data: SubmitType): Promise<any> => {
      const res = await join(data);

      if (res.status === 201) {
        setResMessage("가입이 완료되었습니다!");
        dialogRef.current.showModal();
      } else {
        setResMessage(res.response.data.message);
        dialogRef.current.showModal();
      }
    },
    onError: async (error: any) => {
      undefined;
    }
  };

  return (
    <div className="relative max-w-[740px] pt-[100px] px-[12px] mx-auto sm:px-[12px] sm:pt-[100px] md:px-[52px] md:pt-[100px]">
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
      <div className="flex flex-col gap-5 min-w-[280px] mx-auto">
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
          <div className="flex flex-row justify-center gap-3 text-sm mx-auto mt-8">
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
