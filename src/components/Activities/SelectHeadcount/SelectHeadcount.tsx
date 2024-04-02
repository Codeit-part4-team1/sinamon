import { Dispatch, SetStateAction, ChangeEvent } from "react";

import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

interface SelectHeadcountProp {
  Headcount: number;
  setHeadcount: Dispatch<SetStateAction<number>>;
  isModal?: boolean;
}

const SelectHeadcount = ({
  Headcount,
  setHeadcount,
  isModal
}: SelectHeadcountProp) => {
  const handleHeadcountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > 0) {
      setHeadcount(+e.target.value);
    } else setHeadcount(1);
  };

  return (
    <div className={`md:flex md:flex-col md:gap-2  lg:pt-3 md:pb-6`}>
      <h2 className="md:font-bold md:text-[20px]">참여 인원</h2>
      <div className="flex w-[120px] p-1 h-10 border border-gray-4b4b4b rounded-md text-gray-4b4b4b bg-white-ffffff text-center items-center justify-between  text-[14px]">
        <button
          onClick={() => setHeadcount((prev) => (prev > 1 ? prev - 1 : 1))}
        >
          <FaMinus />
        </button>
        <input
          className="text-center w-[30px] bg-white-ffffff"
          aria-labelledby="participants"
          value={Headcount}
          onChange={handleHeadcountChange}
        />
        <button onClick={() => setHeadcount((prev) => prev + 1)}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default SelectHeadcount;

// ${isModal ? "lg:hidden " : "md:hidden lg:block"}
