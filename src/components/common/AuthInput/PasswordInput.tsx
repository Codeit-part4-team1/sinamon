import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { WhatFor } from "@/types/auth";

const PasswordInput = ({ whatFor }: WhatFor) => {
  const {
    formState: { errors },
    register,
    watch
  } = useFormContext();

  const [eyes, setEyes] = useState<boolean>(false);

  const toggleEyes = () => {setEyes(!eyes);}

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="password" className="text-md font-medium">
        {whatFor === "edit" ? "새 비밀번호" : "비밀번호"}
      </label>
      <input
        id="passowrd"
        placeholder={
          whatFor === "login"
            ? "비밀번호를 입력해 주세요"
            : "8자 이상 입력해 주세요"
        }
        type={eyes ? "text" : "password"}
        {...register("password", {
          required: "비밀번호를 입력해 주세요",
          minLength: { value: 8, message: "8자 이상 입력해 주세요" }
        })}
        className={`border rounded-md h-[48px] p-5 w-full focus:outline-none ${
          watch("password")?.length === 0 || !errors.password
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
        {errors.password && (
          <small className="pl-3 text-red-500">{errors.password.message?.toString()}</small>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
