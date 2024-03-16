import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Pagination = () => {
  const dataArrayLegnth = 180; // 전체 컨텐츠 수
  const visibleContentCount = 20; // 한 페이지에 보여줄 컨텐츠 수
  const visiblePageCount = 5; // 한 화면에 보여질 페이지 수
  const currentPage = 7;

  const totalPage = Math.ceil(dataArrayLegnth / visibleContentCount); // 총 페이지 수
  const currentpageGroup = Math.ceil(currentPage / visiblePageCount); // 현재 페이지 그룹
  const pageGroupFirstNumber = (currentpageGroup - 1) * visiblePageCount + 1; // 현재 페이지 그룹의 첫 번째 페이지 번호
  const pageGroupLastNumber = currentpageGroup * visiblePageCount; // 현재 페이지 그룹의 마지막 페이지 번호

  return (
    <nav className="w-fit">
      <ul className="flex gap-2">
        <li>
          <button className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-white-ffffff border border-gray-adaeb8 hover:border-gray-79747e rounded-md">
            <IoIosArrowBack className="w-4 md:w-5 h-4 md:h-5 text-gray-a4a1aa" />
          </button>
        </li>
        <li>
          <button className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-main rounded-md text-white-ffffff md:text-lg">
            1
          </button>
        </li>
        <li>
          <button className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-sub border border-gray-adaeb8 hover:border-main rounded-md text-main md:text-lg">
            2
          </button>
        </li>
        <li>
          <button className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-sub border border-gray-adaeb8 hover:border-main rounded-md text-main md:text-lg">
            3
          </button>
        </li>
        <li>
          <button className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-sub border border-gray-adaeb8 hover:border-main rounded-md text-main md:text-lg">
            4
          </button>
        </li>
        <li>
          <button className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-sub border border-gray-adaeb8 hover:border-main rounded-md text-main md:text-lg">
            5
          </button>
        </li>
        <li>
          <button className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-white-ffffff border border-gray-adaeb8 hover:border-gray-79747e rounded-md">
            <IoIosArrowForward className="w-4 md:w-5 h-4 md:h-5 text-gray-a4a1aa" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
