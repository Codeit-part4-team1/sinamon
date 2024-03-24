import Image from "next/image";

interface AvatarProps {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
  size: "lg" | "md" | "sm";
}

const Avatar = ({ user, size }: AvatarProps) => {
  const sizeClass: { [key in AvatarProps["size"]]: string } = {
    lg: "w-24 h-24",
    md: "w-11 h-11",
    sm: "w-8 h-8"
  };

  return (
    <div className={`${sizeClass[size]} relative rounded-full overflow-hidden`}>
      {user?.profileImageUrl ? (
        <Image
          src={user.profileImageUrl}
          alt="프로필 사진"
          fill
          sizes="100%"
          priority
        />
      ) : (
        <div className="w-full h-full bg-main"></div>
      )}
    </div>
  );
};

export default Avatar;
