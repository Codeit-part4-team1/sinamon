import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useActivities } from "@/hooks/activities";

interface CardListProps {
  selectedCategory: any;
  // selectedCategory: string | null;
  setTotalPages: any;
  selectPage: any;
  // selectPage: number;
  sort: any;
  // sort: string;
}

interface CardList {
  id: number;
  bannerImageUrl: string;
  reviewCount: number;
  rating: number;
  title: string;
  price: number;
}

const CardList = ({
  selectedCategory,
  setTotalPages,
  selectPage,
  sort
}: CardListProps) => {
  const [size, setSize] = useState(8);

  const { data } = useActivities.getActivitiesList(
    "offset",
    selectPage,
    size,
    selectedCategory,
    sort
  );

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data?.pages[0].totalCount / size));
    }
  }, [data, size]);

  useEffect(() => {
    const handleResize = () => {
      const currentWindowSize = window.innerWidth;

      if (currentWindowSize > 767 && size === 6) {
        setSize(8);
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

  const { activities } = data?.pages[0] || [];

  return (
    <ul className="min-h-[500px] mb-16 md:mb-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 md:gap-x-5 gap-y-7 md:gap-y-10">
      {activities?.map(
        ({
          id,
          bannerImageUrl,
          reviewCount,
          rating,
          title,
          price
        }: CardList) => (
          <li key={id} className="group">
            <Link href={`/activities/${id}`}>
              <div className="w-full mb-2 relative rounded-xl overflow-hidden aspect-square border border-transparent group-hover:border-main group-hover:border">
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
                  <span className="text-black font-semibold">⭐ {rating} </span>
                  <span className="text-gray-a4a1aa">({reviewCount})</span>
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
  );
};

export default CardList;
