import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

const EmailInput = ({ whatFor, errors, watch, register }: any) => {
  const { userCookie } = useContext(AuthContext);

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="email" className="text-md font-medium">
        이메일
      </label>
      <input
        id="email"
        placeholder="이메일을 입력해 주세요"
        autoComplete="off"
        defaultValue={whatFor === "edit" ? userCookie.email : undefined}
        readOnly={whatFor === "edit" ? true : false}
        {...register("email", {
          required: "이메일을 입력해 주세요",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
            message: "이메일 형식에 맞지 않습니다"
          }
        })}
        className={`border rounded-md h-[48px] p-5 w-full focus:outline-none ${
          watch("email")?.length === 0 || !errors.email
            ? "border-input"
            : "border-red-500"
        } ${whatFor === "edit" ? "bg-gray-200" : undefined}`}
      />
      <div className="h-4">
        {errors.email && (
          <small className="pl-3 text-red-500">{errors.email.message}</small>
        )}
      </div>
    </div>
  );
};

export default EmailInput;
