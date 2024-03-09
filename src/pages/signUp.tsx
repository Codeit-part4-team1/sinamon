import { useState, useContext, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { AuthContext } from "@/contexts/AuthProvider";
import EmailInput from "@/components/common/EmailInput";
import NicknameInput from "@/components/common/NicknameInput";
import PasswordInput from "@/components/common/PasswordInput";
import CheckPasswordInput from "@/components/common/CheckPasswordInput";
import Button from "@/components/common/Button";

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

export default function SignUp() {
  const { join } = useContext(AuthContext);
  const router = useRouter();
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

  async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await join(signUpValue);
  }

  return (
    <div className="relative w-full h-full pt-[80px] px-[12px]">
      <div className="flex-col gap-5 mx-auto w-[350px] sm:w-[342px] md:w-[632px] lg:w-[640px] min-w-[375px]">
        <div>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={300}
            height={100}
            className="m-auto"
          />
        </div>
        <form onSubmit={handlerSubmit} className="flex flex-col gap-3 mt-10">
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