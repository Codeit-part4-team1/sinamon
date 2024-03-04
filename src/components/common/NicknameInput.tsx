import { AuthContext } from "@/contexts/AuthProvider";
import React, { useContext } from "react";

type NicknameInputProps = {
  whatFor: "signUp" | "updateUserInfo";
  nickname: string;
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

export default function NicknameInput({
  whatFor,
  nickname,
  handlerOnChange,
  inspection,
  setInspection
}: NicknameInputProps) {
  const { userCookie } = useContext(AuthContext);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    handlerOnChange(e);

    e.target.value.length > 0 && e.target.value.length <= 10
      ? setInspection((prev: InspectionType) => ({ ...prev, nickname: true }))
      : setInspection((prev: InspectionType) => ({ ...prev, nickname: false }));
  }

  return (
    <div>
      <label htmlFor="nickname">닉네임</label>
      <input
        name="nickname"
        placeholder="닉네임을 입력해 주세요"
        onChange={onChange}
        value={whatFor === "updateUserInfo" ? userCookie.nickname : nickname}
      />
      {nickname.length === 0 || inspection ? undefined : (
        <small>잘못된 닉네임 입니다</small>
      )}
    </div>
  );
}
