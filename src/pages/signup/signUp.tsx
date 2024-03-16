import { useState, useContext, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "@/contexts/AuthProvider";
import AlertModal from "@/components/common/Modal/AlertModal";
import EmailInput from "@/components/common/Input/EmailInput";
import NicknameInput from "@/components/common/Input/NicknameInput";
import PasswordInput from "@/components/common/Input/PasswordInput";
import CheckPasswordInput from "@/components/common/Input/CheckPasswordInput";
import Button from "@/components/common/Button/Button";

type InputDataType = {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
};

type InspectionType = {
  email?: boolean;
  nickname?: boolean;
  profileImageUrl?: boolean;
  password?: boolean;
  checkPassword?: boolean;
};

type ResDataType = {
  message: string;
  isSuccess: boolean;
};

export default function SignUp() {
  const { join } = useContext(AuthContext);
  const router = useRouter();
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [resData, setResData] = useState<ResDataType>({
    message: "",
    isSuccess: false
  });
  const [signUpValue, setSignUpValue] = useState<InputDataType>({
    email: "",
    nickname: "",
    password: "",
    checkPassword: ""
  });
  const [inspection, setInspection] = useState<InspectionType>({
    email: false,
    nickname: false,
    password: false,
    checkPassword: false
  });

  function handlerOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "email":
        setSignUpValue((prev) => ({ ...prev, email: value }));
        break;

      case "nickname":
        setSignUpValue((prev) => ({ ...prev, nickname: value }));
        break;

      case "password":
        setSignUpValue((prev) => ({ ...prev, password: value }));
        break;

      case "checkPassword":
        setSignUpValue((prev) => ({ ...prev, checkPassword: value }));
        break;
    }
  }

  let handlerAlertModal;

  resData.isSuccess
    ? (handlerAlertModal = function () {
        router.push("signIn");
      })
    : (handlerAlertModal = function () {
        setAlertModal(false);
      });

  async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await join(signUpValue);

    if (res.status !== 201) {
      setResData((prev: any) => ({
        ...prev,
        message: res.response.data.message,
        isSuccess: false
      }));
      setAlertModal(true);
    } else if (res.status === 201) {
      setResData((prev: any) => ({
        ...prev,
        message: "가입이 완료되었습니다!",
        isSuccess: true
      }));
      setAlertModal(true);
    }
  }

  return (
    <div className="relative w-screen h-screen min-w-[420px]">
      {alertModal && (
        <AlertModal
          type="alert"
          size="md"
          text={resData.message}
          handlerAlertModal={handlerAlertModal}
        />
      )}
      <div className="flex-col gap-5 mx-auto pt-[80px] w-[350px] sm:w-[342px] md:w-[632px] lg:w-[640px] min-w-[375px]">
        <div>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={300}
            height={100}
            className="m-auto"
          />
        </div>
        <form onSubmit={handlerSubmit} className="flex flex-col gap-2 mt-10">
          <div>
            <EmailInput
              whatFor="signUp"
              email={signUpValue.email}
              handlerOnChange={handlerOnChange}
              inspection={inspection.email}
              setInspection={setInspection}
            />
          </div>
          <div>
            <NicknameInput
              whatFor="signUp"
              nickname={signUpValue.nickname}
              handlerOnChange={handlerOnChange}
              inspection={inspection.nickname}
              setInspection={setInspection}
            />
          </div>
          <div>
            <PasswordInput
              whatFor="signUp"
              password={signUpValue.password}
              handlerOnChange={handlerOnChange}
              inspection={inspection.password}
              setInspection={setInspection}
            />
          </div>
          <div>
            <CheckPasswordInput
              whatFor="signUp"
              password={signUpValue.password}
              checkPassword={signUpValue.checkPassword}
              handlerOnChange={handlerOnChange}
              inspection={inspection.checkPassword}
              setInspection={setInspection}
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
}
