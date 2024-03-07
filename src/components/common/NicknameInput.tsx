import React, { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

type NicknameInputProps = {
  whatFor: "signUp" | "updateUserInfo";
  nickname: string;
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
    <div className="relative flex flex-col gap-2" v>
      <label htmlFor="nickname" className="text-md font-medium">
        닉네임
      </label>
      <input
        name="nickname"
        placeholder="닉네임을 입력해 주세요"
        onChange={onChange}
        value={whatFor === "updateUserInfo" ? userCookie.nickname : nickname}
        className="border border-gray-79747e rounded-md h-12 p-5"
      />
      <div className="h-4">
        {nickname.length === 0 || inspection ? undefined : (
          <small className="pl-3 text-red-500">잘못된 닉네임 입니다</small>
        )}
      </div>
    </div>
  );
}