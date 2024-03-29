import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { WhatFor } from "@/types/auth";

const CheckPasswordInput = ({ whatFor }: WhatFor) => {
  const {
    formState: { errors },
    register,
    watch
  } = useFormContext();

  const [eyes, setEyes] = useState<boolean>(false);

  const toggleEyes = () => {
    setEyes(!eyes);
  };

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="checkPassword" className="text-md font-medium">
        {whatFor === "signUp" ? "비밀번호 확인" : "비밀번호 재입력"}
      </label>
      <input
        id="checkPassword"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        autoComplete="off"
        type={eyes ? "text" : "password"}
        {...register("checkPassword", {
          required: "비밀번호를 확인해 주세요",
          validate: (field: string) => {
            return !field
              ? "비밀번호를 확인해 주세요"
              : field.length > 0 && field === watch(whatFor === "edit" ? "newPassword" : "password")
                ? undefined
                : "비밀번호가 일치하지 않습니다";
          }
        })}
        className={`border rounded-md h-[48px] p-5 w-full focus:outline-none ${
          watch("checkPassword")?.length === 0 || !errors.checkPassword
            ? "border-input"
            : "border-red-500"
        }`}
      />
      <div
        onClick={toggleEyes}
        className="absolute right-5 bottom-9 hover:cursor-pointer"
      >
        {eyes ? (
          <BsEye width={25} height={23} />
        ) : (
          <BsEyeSlash width={25} height={23} />
        )}
      </div>
      <div className="h-4">
        {errors.checkPassword && (
          <small className="pl-3 text-red-500">
            {errors.checkPassword.message?.toString()}
          </small>
        )}
      </div>
    </div>
  );
};

export default CheckPasswordInput;
