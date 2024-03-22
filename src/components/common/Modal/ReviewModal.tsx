import React, { useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import ReactDOM from "react-dom";

import { FaXmark } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { AuthContext } from "@/contexts/AuthProvider";
import Button from "@/components/common/Button/Button";
import AlertModal from "@/components/common/Modal/AlertModal";

const ReviewModal = ({ onCancel, destination }: any) => {
  const { userCookie } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ rating: number; content: string }>({ mode: "onChange" });

  const [rating, setRating] = useState<number>(1);

  const submit = {
    onSubmit: async (data: any) => {
      dialogRef.current.showModal();
    },
    onError: async (errors: any) => {
      undefined;
    }
  };

  const dialogRef = useRef<any>();

  return ReactDOM.createPortal(
    <>
      <div className="absolute top-0 bg-gray-400 opacity-40 w-full h-full">
        <dialog ref={dialogRef}>
          <AlertModal
            type="alert"
            size="sm"
            text="후기가 등록되었습니다"
            handlerAlertModal={() => {
              dialogRef.current.close();
            }}
          />
        </dialog>
      </div>
      <div className="absolute top-0 w-full h-full">
        <form
          onSubmit={handleSubmit(submit.onSubmit, submit.onError)}
          className="bg-white-ffffff w-full h-full px-[12px] pt-[35px] pb-[30px] md:border-2 md:border-main md:w-[480px] md:h-[750px] md:px-[24px] md:pt-[28px] md:mx-auto md:my-[100px] md:rounded-lg"
        >
          <div className="flex flex-col gap-[55px] md:gap-[40px]">
            <div className="flex flex-row justify-between h-[40px]">
              <h1 className="font-bold text-[30px]">후기 작성</h1>
              <div onClick={onCancel} className="hover: cursor-pointer">
                <FaXmark size={35} />
              </div>
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-row justify-center gap-[24px] h-[127px]">
                <div className="w-[100px] h-[100px] rounded-lg md:w-[126px] md:h-[127px]">
                  <Image
                    src={"/images/icon-category-culture.svg"}
                    alt="temp-active-preview"
                    width={126}
                    height={126}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="h-[26px] font-bold sm:text-[14px] md:text-[18px]">
                    함께 배우면 즐거운 스트릿 댄스
                  </p>
                  <div className="flex felx-row gap-[3px] md:gap-[8px] font-semibold text-[14px] md:font-bold md:text-[16px]">
                    <p>2023.12.14</p>
                    <p>·</p>
                    <p>11:00-12:30</p>
                    <p>·</p>
                    <p>10명</p>
                  </div>
                  <div className="pt-[12px] border-t border-gray-300 font-bold text-[32px]">
                    ₩10,000
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-[8px] justify-center h-[100px] py-[23px]">
                {[1, 2, 3, 4, 5].map((item: any, index: any) => (
                  <IoIosStar
                    key={index}
                    size={56}
                    name={index}
                    onClick={() => {
                      setRating(index + 1);
                    }}
                    color={rating <= index ? "" : "gold"}
                    className="hover: cursor-pointer"
                  />
                ))}
              </div>
              <div>
                <textarea
                  placeholder="후기를 작성해주세요"
                  {...register("content", {
                    required: "필수 입력 값 입니다"
                  })}
                  className={`border border-gray-400 rounded-md w-full h-[240px] p-[16px] resize-none focus:outline-none ${errors.content && "border-red-400"}`}
                />
              </div>
              <Button text="작성하기" size="full" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </>,
    destination
  );
};

export default ReviewModal;
