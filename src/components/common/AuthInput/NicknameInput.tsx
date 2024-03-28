import React from "react";
import { useFormContext } from "react-hook-form";

const NicknameInput = () => {
  const { formState: { errors }, register, watch } = useFormContext();

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="nickname" className="text-md font-medium">
        닉네임
      </label>
      <input
        id="nickname"
        placeholder="닉네임을 입력해 주세요"
        autoComplete="off"
        {...register("nickname", {
          required: "닉네임을 입력해 주세요",
          maxLength: { value: 10, message: "10자 이하로 작성해 주세요" }
        })}
        className={`border rounded-md h-12 p-5 w-full focus:outline-none ${
          watch("nickname")?.length === 0 || !errors.nickname
            ? "border-input"
            : "border-red-500"
        }`}
      />
      <div className="h-4">
        {errors.nickname && (
          <small className="pl-3 text-red-500">
            {errors.nickname.message?.toString()}
          </small>
        )}
      </div>
    </div>
  );
};

export default NicknameInput;
