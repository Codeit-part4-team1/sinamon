import Link from "next/link";
import Image from "next/image";

import { useUsers } from "@/hooks/useUsers";
import Button from "@/components/common/Button/Button";
import Avatar from "@/components/common/Avatar/Avatar";
import ProfileModal from "@/components/common/Modal/ProfileModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor
} from "@/components/ui/popover";

import { IoNotificationsOutline } from "react-icons/io5";

const Header = () => {
  const { data: user } = useUsers.get();

  return (
    <div className="w-full h-[60px] md:h-20 px-4 md:px-6 flex justify-center bg-white-f9f9f9 border-b-gray-dddddd border-b">
      <header className="max-w-screen-lg w-full h-full flex justify-between items-center">
        <Link href={"/"}>
          <div className="w-[120px] h-6 relative md:w-[200px] md:h-10">
            <Image
              src="/images/logo-header.png"
              alt="synamon 로고"
              fill
              sizes="(min-width: 768px) 200px, 120px"
              priority
            />
          </div>
        </Link>
        {user ? (
          <div className="flex gap-4 items-center">
            <div className="relative cursor-pointer">
              <IoNotificationsOutline
                color="#a4a1aa"
                className="text-2xl md:text-3xl"
              />
            </div>
            <Popover>
              <div className="w-[1px] h-5 md:h-6 bg-gray-a4a1aa"></div>
              <PopoverTrigger asChild>
                <div className="flex gap-2 items-center cursor-pointer">
                  <Avatar user={user.data} size="sm" />
                  <span className="text-base font-medium text-black">
                    {user.data?.nickname}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverAnchor className="relative">
                <PopoverContent className="absolute top-5 right-0 z-50">
                  <ProfileModal user={user.data} />
                </PopoverContent>
              </PopoverAnchor>
            </Popover>
          </div>
        ) : (
          <>
            <div className="flex gap-2 md:gap-4 items-center">
              <Link href={"/signin"}>
                <Button
                  text="로그인"
                  type="button"
                  status="second"
                  className="h-8 px-4 text-sm md:h-10 md:px-6 md:text-base"
                />
              </Link>
              <Link href={"/signup"}>
                <Button
                  text="회원가입"
                  type="button"
                  className="h-8 px-4 text-sm md:h-10 md:px-6 md:text-base"
                />
              </Link>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
