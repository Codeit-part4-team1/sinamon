import { useState, useEffect, useRef, useContext } from "react";
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
  const [modalSize, setModalSize] = useState<"md" | "sm" | "decide">("sm");
  const [resMessage, setResMessage] = useState<string>("");
  const failDialogRef = useRef<any>();
  const successDialogRef = useRef<any>();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setModalSize("sm");
      } else {
        setModalSize("md");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const submit = {
    onSubmit: async (data: SubmitType): Promise<any> => {
      const res = await join(data);

      if (res.status === 201) {
        setResMessage("가입이 완료되었습니다!");
        successDialogRef.current.showModal();
      } else {
        setResMessage(res.response.data.message);
        failDialogRef.current.showModal();
      }
    },
    onError: async (error: any) => {
      undefined;
    }
  };

  return (
    <div className="relative h-full min-w-[375px]">
      <dialog ref={failDialogRef} className="rounded-lg">
        <AlertModal
          type="alert"
          size={modalSize}
          text={resMessage}
          handlerAlertModal={() => {
            failDialogRef.current.close();
          }}
        />
      </dialog>
      <dialog ref={successDialogRef} className="rounded-lg">
        <AlertModal type="alert" size="md" text={resMessage} />
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