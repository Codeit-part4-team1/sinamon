import { ReactNode } from "react";
import { useRouter } from "next/router";
import SideMenu from "@/components/common/SideMenu/SideMenu";

interface MenuLayoutProps {
  children: ReactNode;
}

const MenuLayout = ({ children }: MenuLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-x-7 gap-y-5">
        <SideMenu path={router.pathname} />
        <div className="w-full max-w-[1000px]">{children}</div>
      </div>
    </>
  );
};

export default MenuLayout;
