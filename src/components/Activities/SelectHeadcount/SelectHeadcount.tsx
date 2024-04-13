import { Control, Controller, UseFormSetValue } from "react-hook-form";

import { FaMinus } from "@react-icons/all-files/fa/FaMinus";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { PostReservationData } from "@/components/Activities/ReservationPicker/ReservationDatePicker";

interface SelectHeadcountProp {
  Headcount?: number | undefined;
  setValue?: UseFormSetValue<PostReservationData>;
  control?: Control<PostReservationData>;
  isModal?: boolean;
}

const SelectHeadcount = ({
  Headcount,
  control,
  setValue,
  isModal
}: SelectHeadcountProp) => {
  // const handleHeadcountChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (+e.target.value > 0) {
  //     setHeadcount(+e.target.value);
  //   } else setHeadcount(1);
  // };
  const handleClickCountUp = (prev: number) => {
    if (setValue) {
      const nextCount = ++prev;
      setValue("headCount", nextCount);
    }
  };
  const handleClickCountDown = (prev: number) => {
    if (setValue) {
      const nextCount = --prev;
      setValue("headCount", nextCount);
    }
  };
  return (
    <div className={`md:flex md:flex-col md:gap-2  lg:pt-3 md:pb-6`}>
      <h2 className="md:font-bold md:text-[20px]">참여 인원</h2>
      <Controller
        control={control}
        name="headCount"
        rules={{
          required: true
        }}
        render={({ field: { value, onChange } }) => (
          <>
            <div className="flex w-[120px] p-1 h-10 border border-gray-4b4b4b rounded-md text-gray-4b4b4b bg-white-ffffff text-center items-center justify-between  text-[14px]">
              <button type="button" onClick={() => handleClickCountDown(value)}>
                <FaMinus />
              </button>
              <input
                className="text-center w-[30px]"
                aria-labelledby="participants"
                value={value}
                onChange={onChange}
              />
              <button type="button" onClick={() => handleClickCountUp(value)}>
                <FaPlus />
              </button>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default SelectHeadcount;

// ${isModal ? "lg:hidden " : "md:hidden lg:block"}
