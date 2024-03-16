import { useState, useContext, FormEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthProvider";
import AlertModal from "@/components/common/Modal/AlertModal";
import EmailInput from "@/components/common/Input/EmailInput";
import PasswordInput from "@/components/common/Input/PasswordInput";
import Button from "@/components/common/Button/Button";

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
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [resMessage, setResMessage] = useState<string>("");
  const [alertModal, setAlertModal] = useState<boolean>(false);
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

  function handlerAlertModal() {
    setAlertModal(false);
  }

  async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await login(loginValue);

    if (res.status !== 201) {
      setResMessage(res.response.data.message);
      setAlertModal(true);
    } else if (res.status === 201) {
      router.push("/");
    }
  }

  return (
    <div className="relative w-screen h-screen min-w-[420px]">
      {alertModal && (
        <AlertModal
          type="alert"
          size="md"
          text={resMessage}
          handlerAlertModal={handlerAlertModal}
        />
      )}
      <div className="flex-col gap-5 mx-auto pt-[150px] w-[350px] sm:w-[342px] md:w-[632px] lg:w-[640px] min-w-[375px]">
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
    </div>
  );
}
