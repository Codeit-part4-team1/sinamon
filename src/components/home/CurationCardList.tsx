import Link from "next/link";
import Image from "next/image";

import { useGetCurationActivitiesList } from "@/hooks/activities";
import { ActivityList } from "@/types/activities";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const CurationCardList = () => {
  const { data } = useGetCurationActivitiesList("offset", "most_reviewed", 6);

  const { activities } = data || [];

  return (
    <div className="mb-10 md:mb-14">
      <p className="text-2xl md:text-3xl font-bold mb-4 md:mb-7">인기 모임🔥</p>
      <Carousel
        opts={{
          align: "start"
        }}
      >
        <CarouselContent>
          {activities?.map(
            ({
              id,
              rating,
              reviewCount,
              title,
              price,
              bannerImageUrl
            }: ActivityList) => (
              <CarouselItem
                key={id}
                className="sm:basis-1/2 md:basis-1/3 pl-4 md:pl-5"
              >
                <Link href={`/activities/${id}`}>
                  <div className="relative flex-1 aspect-square rounded-xl overflow-hidden after:w-full after:h-full after:absolute after:bg-gradient-to-tr after:to-60% after:from-zinc-950 after:top-0 after:left-0 border-2 border-transparent hover:border-main">
                    <div className="absolute w-36 md:w-52 bottom-0 pl-4 md:pl-5 pb-3 md:pb-4 flex flex-col gap-1 md:gap-2 z-10">
                      <p className="text-gray-200 text-xs md:text-sm font-medium">
                        ⭐ {rating} ({reviewCount})
                      </p>
                      <p className="text-gray-200 text-base md:text-xl font-semibold break-keep">
                        {title}
                      </p>
                      <p>
                        <span className="text-gray-200 text-sm md:text-base font-bold">
                          ₩ {price.toLocaleString()}
                        </span>
                        <span className="text-gray-a4a1aa text-xs md:text-sm">
                          &nbsp;/ 인
                        </span>
                      </p>
                    </div>
                    <Image
                      className="object-cover"
                      src={bannerImageUrl}
                      alt="temp-active-preview"
                      fill
                      sizes="100%"
                    />
                  </div>
                </Link>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious className="-top-8 md:-top-11 right-12 left-auto" />
        <CarouselNext className="-top-8 md:-top-11 right-0" />
      </Carousel>
    </div>
  );
};

export default CurationCardList;
