import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const CurationCardList = () => {
  return (
    <div className="mb-10 md:mb-14">
      <p className="text-2xl md:text-3xl font-bold mb-4 md:mb-7">인기 모임🔥</p>
      <Carousel
        opts={{
          align: "start"
        }}
      >
        <CarouselContent>
          <CarouselItem className="sm:basis-1/2 md:basis-1/3 pl-4 md:pl-5">
            <div className="relative flex-1 aspect-square rounded-xl overflow-hidden after:w-full after:h-full after:absolute after:bg-gradient-to-tr after:from-black after:top-0 after:left-0">
              <div className="absolute w-36 md:w-52 bottom-0 pl-4 md:pl-5 pb-3 md:pb-4 flex flex-col gap-1 md:gap-2 z-10">
                <p className="text-white-ffffff text-xs md:text-sm font-medium">
                  ⭐ 4.9 (793)
                </p>
                <p className="text-white-ffffff text-base md:text-xl font-semibold break-keep">
                  함께 배우면 즐거운 스트릿 댄스
                </p>
                <p>
                  <span className="text-white-ffffff text-sm md:text-base font-bold">
                    ₩ 38,000
                  </span>
                  <span className="text-gray-a4a1aa text-xs md:text-sm">
                    &nbsp;/ 인
                  </span>
                </p>
              </div>
              <Image
                className="object-cover"
                src={"/images/temp-active-preview.png"}
                alt="temp-active-preview"
                fill
              />
            </div>
          </CarouselItem>
          <CarouselItem className="sm:basis-1/2 md:basis-1/3">
            <div className="relative flex-1 aspect-square rounded-xl overflow-hidden after:w-full after:h-full after:absolute after:bg-gradient-to-tr after:from-black after:top-0 after:left-0"></div>
          </CarouselItem>
          <CarouselItem className="sm:basis-1/2 md:basis-1/3">
            <div className="relative flex-1 aspect-square rounded-xl overflow-hidden after:w-full after:h-full after:absolute after:bg-gradient-to-tr after:from-black after:top-0 after:left-0"></div>
          </CarouselItem>
          <CarouselItem className="sm:basis-1/2 md:basis-1/3">
            <div className="relative flex-1 aspect-square rounded-xl overflow-hidden after:w-full after:h-full after:absolute after:bg-gradient-to-tr after:from-black after:top-0 after:left-0"></div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="-top-8 md:-top-11 right-12 left-auto" />
        <CarouselNext className="-top-8 md:-top-11 right-0" />
      </Carousel>
    </div>
  );
};

export default CurationCardList;
