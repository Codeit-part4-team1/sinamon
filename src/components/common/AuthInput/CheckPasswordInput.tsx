import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const CheckPasswordInput = ({ whatFor, errors, watch, register }: any) => {
  const [eyesIcon, setEyesIcon] = useState<boolean>(false);

  function togglesEyesIcon() {
    setEyesIcon(!eyesIcon);
  }

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="checkPassword" className="text-md font-medium">
        {whatFor === "signUp" ? "비밀번호 확인" : "비밀번호 재입력"}
      </label>
      <input
        name="checkPassword"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        autoComplete="off"
        type={eyesIcon ? "text" : "password"}
        {...register("checkPassword", {
          required: "비밀번호를 확인해 주세요",
          validate: (field: string) => {
            return !field
              ? "비밀번호를 확인해 주세요"
              : field.length > 0 && field === watch("password")
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
        onClick={togglesEyesIcon}
        className="absolute right-5 bottom-9 hover:cursor-pointer"
      >
        {eyesIcon ? (
          <BsEye width={25} height={23} />
        ) : (
          <BsEyeSlash width={25} height={23} />
        )}
      </div>
      <div className="h-4">
        {errors.checkPassword && (
          <small className="pl-3 text-red-500">
            {errors.checkPassword.message}
          </small>
        )}
      </div>
    </div>
  );
};

export default CheckPasswordInput;

