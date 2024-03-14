import Image from "next/image";

import { FaXmark } from "react-icons/fa6";
import { IoIosStarOutline } from "react-icons/io";
import Button from "./Button";

const ReviewModal = () => {
  return (
    <form className="border-2 sm:w-screen sm:h-screen md:w-[480px] md:h-[750px] md:rounded-lg md:px-[24px] md:pt-[28px]">
      <div className="flex flex-col gap-[40px]">
        <div className="flex flex-row justify-between h-[40px]">
          <h1 className="font-bold text-[30px]">후기 작성</h1>
          <div>
            <FaXmark size={35} />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-[24px]">
          <div className="flex flex-row gap-[24px] h-[127px]">
            <div className="w-[126px] h-[127px] rounded-lg">
              <Image
                src={"/images/temp-profile.png"}
                alt="temp-active-preview"
                width={126}
                height={126}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-[12px]">
              <h1 className="h-[26px] font-bold text-[20px]">
                함께 배우면 즐거운 스트릿 댄스
              </h1>
              <p>2023.2.14 11:00 - 12:30 10명</p>
              <div className="pt-[12px] border-t-gray-400 font-bold text-[32px]">
                ₩10,000
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-[8px] justify-center h-[100px] py-[23px]">
            <IoIosStarOutline size={56} />
            <IoIosStarOutline size={56} />
            <IoIosStarOutline size={56} />
            <IoIosStarOutline size={56} />
            <IoIosStarOutline size={56} />
          </div>
          <div>
            <textarea className="border border-gray-400 rounded-md w-full h-[240px] resize: noneg" />
          </div>
          <Button text="작성하기" size="full" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default ReviewModal;
