import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const PasswordInput = ({ whatFor, errors, watch, register }: any) => {
  const [eyesIcon, setEyesIcon] = useState<boolean>(false);

  function togglesEyesIcon() {
    setEyesIcon(!eyesIcon);
  }

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="password" className="text-md font-medium">
        비밀번호
      </label>
      <input
        id="passowrd"
        placeholder={
          whatFor === "login"
            ? "비밀번호를 입력해 주세요"
            : "8자 이상 입력해 주세요"
        }
        autoComplete="off"
        type={eyesIcon ? "text" : "password"}
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
        {errors.password && (
          <small className="pl-3 text-red-500">{errors.password.message}</small>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
