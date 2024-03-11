import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Image from "next/image";

interface MainPageLayoutProps {
  children: ReactNode;
}

const MainPageLayout = ({ children }: MainPageLayoutProps) => {
  return (
    <>
      <Header />
      <div className="relative h-[320px] sm:h-[400px] md:h-[480px] max-w-[1920px] mx-auto mb-6 md:mb-10 px-4 md:px-6 after:w-full after:h-full after:absolute after:bg-gradient-to-r after:from-black after:top-0 after:left-0">
        <div className="max-w-screen-lg h-full mx-auto">
          <div className="w-52 sm:w-[280px] md:w-[480px] h-full py-[88px] sm:py-[104px] md:py-28 flex flex-col justify-between">
            <p className="text-2xl sm:text-4xl md:text-5xl text-white-ffffff font-bold sm:leading-[44px] md:leading-[64px] break-keep z-10">
              함께 배우면 즐거운 스트릿 댄스
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-white-ffffff font-bold z-10">
              3월의 인기 모임 BEST🔥
            </p>
          </div>
        </div>
        <Image
          className="object-cover"
          src={"/images/temp-active-preview.png"}
          alt="temp-active-preview"
          fill
        />
      </div>
      <main className="max-w-screen-lg mx-auto px-4 md:px-6">{children}</main>
    </>
  );
};

export default MainPageLayout;
