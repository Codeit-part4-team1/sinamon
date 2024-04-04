import React, { useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import ReactDOM from "react-dom";

import { FaXmark } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import Button from "@/components/common/Button/Button";
import AlertModal from "@/components/common/Modal/AlertModal";
import { useMyReservations } from "@/hooks/useMyReservations";

const ReviewModal = ({
  onCancel,
  destination,
  id,
  bannerImageUrl,
  title,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
  setReviewModalVisible
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ rating: number; content: string }>({ mode: "onChange" });

  const [rating, setRating] = useState<number>(1);
  const { reviewMyReservations } = useMyReservations();
  const { mutate } = reviewMyReservations(id);

  const submit = {
    onSubmit: async (data: any) => {
      dialogRef.current.showModal();
      const reviewBody = {
        rating: rating,
        ...data
      };
      mutate(reviewBody);
      setReviewModalVisible((prev: boolean) => !prev);
    },
    onError: async (errors: any) => {
      undefined;
    }
  };

  const dialogRef = useRef<any>();

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="absolute top-0 bg-gray-400 opacity-40 dark:bg-zinc-950 dark:opacity-70 w-full h-full">
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
          className="bg-white-ffffff border-2 border-main w-[340px] h-[608px] md:w-[480px] md:h-[720px] px-[16px] pt-[20px] md:px-[24px] md:pt-[28px] mx-auto my-[100px] rounded-lg"
        >
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex flex-row justify-between h-[40px]">
              <h1 className="font-bold text-xl md:text-2xl">후기 작성</h1>
              <div onClick={onCancel} className="hover: cursor-pointer">
                <FaXmark className="text-2xl md:text-3xl" />
              </div>
            </div>
            <div className="flex flex-col gap-5 md:gap-[24px]">
              <div className="flex flex-row justify-between gap-[16px] md:gap-[24px] h-auto md:h-[127px]">
                <div className="relative w-[100px] h-[100px] rounded-lg md:w-[126px] md:h-[126px]">
                  <Image
                    src={bannerImageUrl}
                    alt="bannerImageUrl"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col md:flex-1 gap-2 md:gap-[12px]">
                  <p className="h-[26px] font-bold text-base md:text-[18px]">
                    {title}
                  </p>
                  <div className="flex felx-row gap-[3px] md:gap-[8px] font-semibold text-[12px] md:font-bold md:text-[16px]">
                    <p>{date}</p>
                    <p>·</p>
                    <p>
                      {startTime}-{endTime}
                    </p>
                    <p>·</p>
                    <p>{headCount}명</p>
                  </div>
                  <div className="pt-[12px] border-t border-gray-300 font-bold text-lg md:text-2xl">
                    ￦{totalPrice.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-[8px] justify-center h-auto md:h-[100px] md:py-[23px]">
                {[1, 2, 3, 4, 5].map((item: any, index: any) => (
                  <IoIosStar
                    key={index}
                    name={index}
                    onClick={() => {
                      setRating(index + 1);
                    }}
                    color={rating <= index ? "" : "gold"}
                    className="text-5xl md:text-[56px] hover: cursor-pointer"
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
    </div>,
    destination
  );
};

export default ReviewModal;
