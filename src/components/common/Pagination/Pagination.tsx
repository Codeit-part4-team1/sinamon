import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  selectPage: number;
  setSelectPage: (prev: number) => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  goNext?: () => void;
  goPrev?: () => void;
}

const Pagination = ({
  totalPages,
  selectPage,
  setSelectPage,
  canGoNext,
  canGoPrev,
  goNext,
  goPrev
}: PaginationProps) => {
  const pageCountToShow = 5;
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const middlePage = Math.ceil(pageCountToShow / 2);
  let startRange = Math.max(1, selectPage - middlePage + 1);
  const endRange = Math.min(totalPages, startRange + pageCountToShow - 1);

  startRange = Math.max(1, endRange - pageCountToShow + 1);

  return (
    <nav className="w-fit mx-auto">
      <ul className="flex gap-2">
        <li>
          <button
            className="group w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-white-ffffff border border-gray-adaeb8 hover:border-gray-79747e rounded-md disabled:border-gray-dddddd dark:disabled:border-gray-4b4b4b"
            disabled={!canGoPrev}
            onClick={goPrev}
          >
            <IoIosArrowBack className="w-4 md:w-5 h-4 md:h-5 text-gray-a4a1aa group-disabled:text-gray-dddddd dark:group-disabled:text-gray-4b4b4b" />
          </button>
        </li>
        {pageNumbers.slice(startRange - 1, endRange).map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => setSelectPage(pageNumber)}
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
          <button
            className="group w-8 md:w-12 h-8 md:h-12 flex justify-center items-center bg-white-ffffff border border-gray-adaeb8 hover:border-gray-79747e rounded-md disabled:border-gray-dddddd dark:disabled:border-gray-4b4b4b"
            disabled={!canGoNext}
            onClick={goNext}
          >
            <IoIosArrowForward className="w-4 md:w-5 h-4 md:h-5 text-gray-a4a1aa group-disabled:text-gray-dddddd dark:group-disabled:text-gray-4b4b4b" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
