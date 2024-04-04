import { useForm } from "react-hook-form";

import { IoSearchOutline } from "react-icons/io5";

interface SearchbarProps {
  setKeyword: (prev: string) => void;
}

const Searchbar = ({ setKeyword }: SearchbarProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const handleInputChange = (e: any) => {
    if (e.target.value === "") {
      setKeyword("");
    }
  };

  const onSubmit = (value: any) => {
    setKeyword(value.keyword);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 p-5 pb-7 md:p-8 mb-10 md:mb-14 bg-sub rounded-xl border border-gray-adaeb8">
      <p className="text-lg md:text-xl font-bold">어떤 모임을 원하시나요?</p>
      <form
        className="relative flex gap-2 md:gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-1 relative">
          <IoSearchOutline className="left-3 absolute top-2/4 -translate-y-1/2 text-main text-xl md:text-2xl" />
          <input
            className="w-full pl-10 md:pl-12 pr-3 h-10 md:h-12 bg-white-ffffff text-base rounded-md border border-main outline-none"
            type="text"
            placeholder="내가 원하는 모임은"
            {...register("keyword", {
              onChange: handleInputChange,
              maxLength: {
                value: 12,
                message: "검색어는 13자 미만으로 입력해 주세요"
              }
            })}
          />
        </div>
        <button
          className="h-10 px-6 text-base md:h-12 md:px-8 bg-main rounded-md text-white-ffffff font-medium"
          type="submit"
        >
          검색
        </button>
        {errors["keyword"]?.message && (
          <span className="absolute bottom-0 translate-y-full text-sm text-red-ff472e">
            {String(errors["keyword"]?.message)}
          </span>
        )}
      </form>
    </div>
  );
};

export default Searchbar;
