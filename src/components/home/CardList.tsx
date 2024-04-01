import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useGetActivitiesList } from "@/hooks/activities";
import { ActivityList } from "@/types/activities";
import { getCookie } from "@/utils/cookie";
import Pagination from "@/components/common/Pagination/Pagination";
import Button from "@/components/common/Button/Button";

interface CardListProps {
  selectedCategory: string | null;
  sort: string;
  keyword: string;
  setTotalDataCount: (prev: number) => void;
}

const CardList = ({
  selectedCategory,
  sort,
  keyword,
  setTotalDataCount
}: CardListProps) => {
  const [size, setSize] = useState(8);
  const [selectedPage, setSelectedPage] = useState(1);

  const { data } = useGetActivitiesList(
    "offset",
    selectedPage,
    size,
    selectedCategory,
    sort,
    keyword
  );

  const { push } = useRouter();

  const totalPages = Math.ceil((data?.totalCount ?? 0) / size);
  const hasNextPage = selectedPage * size < (data?.totalCount ?? 0);
  const hasPreviousPage = selectedPage !== 1;

  const goNext = () => setSelectedPage((prev) => prev + 1);
  const goPrev = () => setSelectedPage((prev) => prev - 1);

  useEffect(() => {
    setSelectedPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    const handleResize = () => {
      const currentWindowSize = window.innerWidth;

      if (currentWindowSize > 767 && size === 6) {
        setSize(8);
        setSelectedPage((prev) => (prev === 1 ? prev : prev - 1));
      } else if (currentWindowSize <= 767 && size === 8) {
        setSize(6);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  const { activities } = data ?? [];

  useEffect(() => {
    setTotalDataCount(data?.totalCount);
  }, [activities]);

  return (
    <>
      {activities && activities.length > 0 ? (
        <>
          <ul className="min-h-[500px] mb-16 md:mb-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 md:gap-x-5 gap-y-7 md:gap-y-10">
            {activities?.map(
              ({
                id,
                bannerImageUrl,
                reviewCount,
                rating,
                title,
                price
              }: ActivityList) => (
                <li key={id} className="group">
                  <Link href={`/activities/${id}`}>
                    <div className="w-full mb-2 relative rounded-xl overflow-hidden aspect-square border-2 border-transparent group-hover:border-main">
                      <Image
                        className="object-cover"
                        src={bannerImageUrl}
                        alt="모임 이미지"
                        fill
                        sizes="100%"
                      />
                    </div>
                    <div className="flex flex-col gap-[2px] md:gap-1">
                      <p className="text-xs md:text-sm">
                        <span className="text-black font-semibold">
                          ⭐ {rating}{" "}
                        </span>
                        <span className="text-gray-a4a1aa">
                          ({reviewCount})
                        </span>
                      </p>
                      <p className="text-black text-sm md:text-base leading-4 md:leading-5 font-semibold">
                        {title}
                      </p>
                      <p>
                        <span className="text-black text-xs md:text-sm font-bold">
                          ₩ {price.toLocaleString()}
                        </span>
                        <span className="text-gray-79747e text-xs md:text-sm">
                          &nbsp;/ 인
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
          <Pagination
            totalPages={totalPages}
            selectPage={selectedPage}
            setSelectPage={setSelectedPage}
            canGoNext={hasNextPage}
            canGoPrev={hasPreviousPage}
            goNext={goNext}
            goPrev={goPrev}
          />
        </>
      ) : (
        <div className="min-h-[500px] flex flex-col justify-center items-center">
          <p className="mb-6 text-lg font-medium">아직 등록된 체험이 없어요</p>
          <div
            onClick={() =>
              getCookie("accessToken")
                ? push("/mypage/activities/create")
                : push("/signin")
            }
          >
            <Button size="lg" text="체험 등록하러 가기" type="button" />
          </div>
        </div>
      )}
    </>
  );
};

export default CardList;
