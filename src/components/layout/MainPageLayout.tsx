import { ReactNode } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { Moon, Sun } from "lucide-react";

interface MainPageLayoutProps {
  children: ReactNode;
}

const MainPageLayout = ({ children }: MainPageLayoutProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Header />
      <div className="relative h-[320px] sm:h-[400px] md:h-[480px] max-w-[1920px] mx-auto mb-6 md:mb-10 px-4 md:px-6 after:w-full after:h-full after:absolute after:bg-gradient-to-r after:from-zinc-950 after:top-0 after:left-0">
        <div className="max-w-screen-lg h-full mx-auto">
          <div className="w-52 sm:w-[280px] md:w-[480px] h-full py-[88px] sm:py-[104px] md:py-28 flex flex-col justify-between">
            <p className="text-2xl sm:text-4xl md:text-5xl text-white-ffffff dark:text-gray-200 font-bold sm:leading-[44px] md:leading-[64px] break-keep z-10">
              함께 배우면 즐거운 스트릿 댄스
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-white-ffffff dark:text-gray-200 font-bold z-10">
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
      <main className="px-4 md:px-6">
        <div className="max-w-screen-lg mx-auto mb-36 md:mb-48">
          {children}
          <button
            className="fixed right-12 bottom-12 w-10 h-10 flex justify-center items-center rounded border border-white-ffffff bg-black"
            type="button"
            onClick={
              theme === "dark"
                ? () => setTheme("light")
                : () => setTheme("dark")
            }
          >
            <Sun className="text-white-ffffff hidden dark:block" />
            <Moon className="text-white-ffffff block dark:hidden" />
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainPageLayout;
