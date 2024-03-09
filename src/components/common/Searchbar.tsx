import { IoSearchOutline } from "react-icons/io5";

const Searchbar = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 p-5 md:p-8 bg-sub rounded-xl border border-gray-adaeb8 mb-10">
      <p className="text-lg md:text-xl font-bold">어떤 모임을 원하시나요?</p>
      <form className="flex gap-2 md:gap-4">
        <div className="flex-1 relative">
          <IoSearchOutline className="left-3 absolute top-2/4 -translate-y-1/2 text-main text-xl md:text-2xl" />
          <input
            className="w-full pl-10 md:pl-12 pr-3 h-10 md:h-12 bg-white-ffffff text-base rounded-md border border-main outline-none"
            type="text"
            placeholder="내가 원하는 모임은"
          />
        </div>
        <button
          className="h-10 px-6 text-base md:h-12 md:px-8 bg-main rounded-md text-white-ffffff font-medium"
          type="submit"
        >
          검색
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
