import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

type EmailInputProps = {
  whatFor: "login" | "signUp" | "updateUserInfo";
  email: string;
  handlerOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inspection: boolean;
  setInspection: any;
};

type InspectionType = {
  email: boolean;
  nickname: boolean;
  password: boolean;
  checkPassword: boolean;
};

export default function EmailInput({
  whatFor,
  email,
  handlerOnChange,
  inspection,
  setInspection
}: EmailInputProps) {
  const { userCookie } = useContext(AuthContext);

  function onchange(e: React.ChangeEvent<HTMLInputElement>) {
    handlerOnChange(e);
    const value = e.target.value;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    value.length === 0 || emailRegex.test(value)
      ? setInspection((prev: InspectionType) => ({ ...prev, email: true }))
      : setInspection((prev: InspectionType) => ({ ...prev, email: false }));
  }

  return (
    <div>
      <label htmlFor="email">이메일</label>
      <input
        name="email"
        placeholder="이메일을 입력해 주세요"
        onChange={onchange}
        value={whatFor === "updateUserInfo" ? userCookie.email : email}
      />
      {email.length === 0 || inspection ? undefined : (
        <small>잘못된 이메일입니다</small>
      )}
    </div>
  );
}
