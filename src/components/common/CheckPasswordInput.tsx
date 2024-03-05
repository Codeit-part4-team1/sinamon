import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

type CheckPasswordInputProps = {
  whatFor: "signUp" | "updateUserInfo";
  password: string;
  checkPassword: string;
  handlerOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inspection: boolean;
  setInspection: Dispatch<SetStateAction<InspectionType>>;
};

type InspectionType = {
  email: boolean;
  nickname: boolean;
  password: boolean;
  checkPassword: boolean;
};

export default function CheckPasswordInput({
  whatFor,
  password,
  checkPassword,
  handlerOnChange,
  inspection,
  setInspection
}: CheckPasswordInputProps) {
  const [showEyesIcon, setShowEyesIcon] = useState<boolean>(false);

  function toggleShowEyesIcon() {
    setShowEyesIcon(!showEyesIcon);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    handlerOnChange(e);

    e.target.value === password
      ? setInspection((prev: InspectionType) => ({
          ...prev,
          checkPassword: true
        }))
      : setInspection((prev: InspectionType) => ({
          ...prev,
          checkPassword: false
        }));
  }

  return (
    <div>
      <label htmlFor="checkPassword">
        {whatFor === "signUp" ? "비밀번호 확인" : "비밀번호 재입력"}
      </label>
      <input
        name="checkPassword"
        type={showEyesIcon ? "text" : "password"}
        placeholder="비밀번호를 한번 더 입력해 주세요"
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
      {checkPassword.length === 0 || inspection ? undefined : <small>비밀번호가 일치하지 않습니다</small>}
    </div>
  );
}
