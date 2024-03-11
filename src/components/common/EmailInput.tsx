import React, { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

type EmailInputProps = {
  whatFor: "login" | "signUp" | "updateUserInfo";
  email: string;
  handlerOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inspection: boolean | undefined;
  setInspection: Dispatch<SetStateAction<InspectionType>>;
};

type InspectionType = {
  email?: boolean;
  nickname?: boolean;
  profileImageUrl?: boolean;
  password?: boolean;
  checkPassword?: boolean;
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
      ? setInspection((prev: any) => ({ ...prev, email: true }))
      : setInspection((prev: InspectionType) => ({ ...prev, email: false }));
  }

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="email" className="text-md font-medium">
        이메일
      </label>
      <input
        name="email"
        placeholder="이메일을 입력해 주세요"
        onChange={onchange}
        value={whatFor === "updateUserInfo" ? userCookie.email : email}
        className={`border rounded-md h-12 p-5 ${
          email.length === 0 || inspection ? "border-input" : "border-red-500"
        }`}
      />
      <div className="h-4">
        {email.length === 0 || inspection ? undefined : (
          <small className="pl-3 text-red-500">잘못된 이메일입니다</small>
        )}
      </div>
    </div>
  );
}
