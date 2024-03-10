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
      <div className="relative h-[480px] max-w-[1920px] mx-auto">
        <div className="mx-auto max-w-screen-lg">
          <div className="w-[480px] h-full py-28 absolute flex flex-col justify-between z-10">
            <p className="text-5xl text-white-ffffff font-bold leading-[64px] break-keep">
              함께 배우면 즐거운 스트릿 댄스
            </p>
            <p className="text-2xl text-white-ffffff font-bold">
              3월의 인기 체험
            </p>
          </div>
        </div>
        <Image
          className="object-cover"
          src={"/images/temp-active-preview.png"}
          alt=""
          fill
        />
      </div>
      <main className="mx-auto max-w-screen-lg">{children}</main>
    </>
  );
};

export default MainPageLayout;
