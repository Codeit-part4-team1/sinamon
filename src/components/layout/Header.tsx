import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import { myNotifications } from "@/hooks/useMyNotifications";
import { useGetUser } from "@/hooks/users";
import Button from "@/components/common/Button/Button";
import Avatar from "@/components/common/Avatar/Avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor
} from "@/components/ui/popover";

import { GoDotFill } from "react-icons/go";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";

const NotificationModal = dynamic(
  () => import("@/components/common/Modal/NotificationModal"),
  { ssr: false }
);
const ProfileModal = dynamic(
  () => import("@/components/common/Modal/ProfileModal"),
  { ssr: false }
);

const Header = () => {
  const { data: user } = useGetUser();
  const { data: notifications } = myNotifications.get();

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
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                  <IoNotificationsOutline
                    color="#a4a1aa"
                    className="text-2xl md:text-3xl"
                  />
                  {notifications?.data.notifications.length > 0 && (
                    <GoDotFill
                      size={12}
                      color={"red"}
                      className="absolute top-[-3px] left-[17px] md:left-[20px]"
                    />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverAnchor className="relative">
                <PopoverContent className="absolute top-5 right-[-120px] md:right-0 z-50">
                  <NotificationModal />
                </PopoverContent>
              </PopoverAnchor>
            </Popover>
            <div className="w-[1px] h-5 mx-2 md:mx-4 md:h-6 bg-gray-a4a1aa"></div>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex gap-2 items-center cursor-pointer">
                  <Avatar user={user} size="sm" />
                  <span className="text-sm md:text-base font-medium text-black">
                    {user?.nickname}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverAnchor className="relative">
                <PopoverContent className="absolute top-5 right-0 z-50">
                  <ProfileModal user={user} />
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
