import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages?: any;
  selectPage?: number;
  setSelectPage?: any;
}

const Pagination = ({
  totalPages,
  selectPage,
  setSelectPage
}: PaginationProps) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav className="w-fit mx-auto">
      <ul className="flex gap-2">
        <li>
          <button className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-white-ffffff border border-gray-adaeb8 hover:border-gray-79747e rounded-md">
            <IoIosArrowBack className="w-4 md:w-5 h-4 md:h-5 text-gray-a4a1aa" />
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} onClick={() => setSelectPage(pageNumber)}>
            <button
              className={cn(
                "w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-sub border border-gray-adaeb8 hover:border-main rounded-md text-main md:text-lg",
                selectPage === pageNumber && "bg-main text-white-ffffff"
              )}
            >
              {pageNumber}
            </button>
          </li>
        ))}
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
