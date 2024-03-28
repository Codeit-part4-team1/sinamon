import { ReactNode } from "react";
import { useRouter } from "next/router";

import SideMenu from "@/components/common/SideMenu/SideMenu";

interface MenuLayoutProps {
  children: ReactNode;
}

const MenuLayout = ({ children }: MenuLayoutProps) => {
  const { pathname } = useRouter();

  const handlePath = (url: string) => {
    if (url === "/mypage") {
      return "";
    } else {
      const parts = url.split("/mypage/");
      return parts.length === 1 ? "" : parts[1].split("/")[0];
    }
  };

  const path = handlePath(pathname);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-x-7 gap-y-5">
        <SideMenu path={path} />
        <div className="w-full max-w-[1000px]">{children}</div>
      </div>
    </>
  );
};

export default MenuLayout;
