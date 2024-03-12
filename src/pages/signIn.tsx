import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { AuthContext } from "@/contexts/AuthProvider";
import AlertModal from "@/components/common/AlertModal";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import Button from "@/components/common/Button";

type ModalType = {
  modal: boolean;
  message: string;
};

const SignIn = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<{ email: string; password: string }>({ mode: "onChange" });
  const [modal, setModal] = useState<ModalType>({
    modal: false,
    message: ""
  });

  const submit = {
    onSubmit: async (data: any) => {
      const res = await login(data);

      if (res.status === 201) {
        router.push("/");
      } else {
        setModal((prev: ModalType) => ({
          ...prev,
          modal: !modal.modal,
          message: res.response.data.message
        }));
      }
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
            setModal((prev: ModalType) => ({ ...prev, modal: !modal.modal }));
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