import React, { Dispatch, SetStateAction, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type CheckPasswordInputProps = {
  whatFor: "signUp" | "updateUserInfo";
  password: string;
  checkPassword: string;
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
    <div className="relative flex flex-col gap-2">
      <label htmlFor="checkPassword" className="text-md font-medium">
        {whatFor === "signUp" ? "비밀번호 확인" : "비밀번호 재입력"}
      </label>
      <input
        name="checkPassword"
        type={showEyesIcon ? "text" : "password"}
        placeholder="비밀번호를 한 번 더 입력해 주세요"
        onChange={onChange}
        className={`border rounded-md h-12 p-5 ${
          checkPassword.length === 0 || inspection
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
        {checkPassword.length === 0 || inspection ? undefined : (
          <small className="pl-3 text-red-500">
            비밀번호가 일치하지 않습니다
          </small>
        )}
      </div>
    </div>
  );
}
