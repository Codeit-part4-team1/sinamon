import React, { Dispatch, SetStateAction, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type PasswordInputProps = {
  whatFor: "login" | "signUp" | "updateUserInfo";
  password: string;
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
    <div className="relative flex flex-col gap-2">
      <label htmlFor="password" className="text-md font-medium">
        비밀번호
      </label>
      <input
        name="password"
        type={showEyesIcon ? "text" : "password"}
        placeholder={
          whatFor === "login"
            ? "비밀번호를 입력해 주세요"
            : "8자 이상 입력해 주세요"
        }
        onChange={onChange}
        className={`border rounded-md h-12 p-5 ${
          password.length === 0 || inspection
            ? "border-input"
            : "border-red-500"
        }`}
      />
      <div
        onClick={toggleShowEyesIcon}
        className="absolute right-5 bottom-10 hover:cursor-pointer"
      >
        {showEyesIcon ? (
          <BsEye width={25} height={23} />
        ) : (
          <BsEyeSlash width={25} height={23} />
        )}
      </div>
      <div className="h-4">
        {password.length === 0 || inspection ? undefined : (
          <small className="pl-3 text-red-500">8자 이상 입력해 주세요</small>
        )}
      </div>
    </div>
  );
}
