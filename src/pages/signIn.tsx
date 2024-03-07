import { useState, useEffect, useContext, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthProvider";
import EmailInput from "@/components/common/EmailInput";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";

type LoginInfo = {
  email: string;
  password: string;
};

type InspectionType = {
  email?: boolean;
  nickname?: boolean;
  profileImageUrl?: boolean;
  password?: boolean;
  checkPassword?: boolean;
};

export default function SignIn() {
  const { userCookie, login } = useContext(AuthContext);
  const [res, setRes] = useState();
  const [loginValue, setLoginValue] = useState<LoginInfo>({
    email: "",
    password: ""
  });
  const [inspection, setInspection] = useState<InspectionType>({
    email: false,
    password: false
  });

  function handlerOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    switch (targetName) {
      case "email":
        setLoginValue((prev) => ({ ...prev, email: targetValue }));
        break;

      case "password":
        setLoginValue((prev) => ({ ...prev, password: targetValue }));
        break;
    }
  }

  async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await login(loginValue);
    setRes(response);
  }

  return (
    <div className="flex-col mx-5 gap-8 mt-20">
      <div>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={300}
          height={100}
          className="m-auto"
        />
      </div>
      <form onSubmit={handlerSubmit} className="flex flex-col gap-3">
        <div>
          <EmailInput
            whatFor="login"
            email={loginValue.email}
            handlerOnChange={handlerOnChange}
            inspection={inspection.email}
            setInspection={setInspection}
          />
        </div>
        <div>
          <PasswordInput
            whatFor="login"
            password={loginValue.password}
            handlerOnChange={handlerOnChange}
            inspection={inspection.password}
            setInspection={setInspection}
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
  );
}