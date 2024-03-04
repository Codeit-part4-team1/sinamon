import React, { useState } from "react";
import Image from "next/image";

type PasswordInputProps = {
  whatFor: "login" | "signUp" | "updateUserInfo";
  password: string;
  handlerOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inspection: boolean;
  setInspection: any;
};

type InspectionType = {
  email: boolean;
  nickname?: boolean;
  password: boolean;
  checkPassword?: boolean;
};

export default function PasswordInput({
  whatFor,
  password,
  handlerOnChange,
  inspection,
  setInspection
}: PasswordInputProps) {
  const [showEyesIcon, setShowEyesIcon] = useState<boolean>(false);

  function toggleShowEyesIcon() {
    setShowEyesIcon(!showEyesIcon);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    handlerOnChange(e);

    e.target.value.length >= 8
      ? setInspection((prev: InspectionType) => ({ ...prev, password: true }))
      : setInspection((prev: InspectionType) => ({ ...prev, password: false }));
  }

  return (
    <div>
      <label htmlFor="password">비밀번호</label>
      <input
        name="password"
        type={showEyesIcon ? "text" : "password"}
        placeholder={
          whatFor === "login"
            ? "비밀번호를 입력해 주세요"
            : "8자 이상 입력해 주세요"
        }
        onChange={onChange}
      />
      <div onClick={toggleShowEyesIcon}>
        <Image
          src={
            showEyesIcon
              ? "/image/opendEyesIcon.svg"
              : "/image/closedEyesIcon.svg"
          }
          alt="closedEyesIcon"
          width={20}
          height={20}
        />
      </div>
      {password.length === 0 || inspection ? undefined : (
        <small>8자 이상 입력해 주세요</small>
      )}
    </div>
  );
}