import Link from "next/link";
import Image from "next/image";
import Button from "@/components/common/Button";
import { IoNotificationsOutline } from "react-icons/io5";

interface HeaderProps {
  user?: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div className="w-full h-[60px] md:h-20 px-4 md:px-6 flex justify-center bg-white-f9f9f9 border-b-gray-dddddd border-b">
      <header className="max-w-screen-lg w-full h-full flex justify-between items-center">
        <div className="w-[120px] h-6 relative md:w-[200px] md:h-10">
          <Image
            src="/images/logo-header.png"
            alt="synamon 로고"
            fill
            sizes="(min-width: 768px) 200px, 120px"
            priority
          />
        </div>
        {user ? (
          <div className="flex gap-4 items-center">
            <div className="relative cursor-pointer">
              <IoNotificationsOutline
                color="#a4a1aa"
                className="text-2xl md:text-3xl"
              />
            </div>
            <div className="w-[1px] h-5 md:h-6 bg-gray-a4a1aa"></div>
            <div className="flex gap-2 items-center cursor-pointer">
              <div className="w-8 h-8 relative rounded-full overflow-hidden">
                <Image
                  src={user.profileImageUrl}
                  alt="프로필 사진"
                  fill
                  sizes="100%"
                  priority
                />
              </div>
              <span className="text-base font-medium text-black">
                {user.nickname}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2 md:gap-4 items-center">
              <Link href={"/signIn"}>
                <Button
                  text="로그인"
                  type="button"
                  status="second"
                  className="h-8 px-4 text-sm md:h-10 md:px-6 md:text-base"
                />
              </Link>
              <Link href={"/signUp"}>
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
