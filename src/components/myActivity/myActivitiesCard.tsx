import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMyActivities } from "@/hooks/useMyActivites";
import type { MyActivitiesType } from "@/types/MyActivitiesType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown";
import { HiMenu } from "react-icons/hi";
import AlertModal from "../common/Modal/AlertModal";

const MyActivitiesCard: React.FC<MyActivitiesType> = ({
  bannerImageUrl,
  title,
  price,
  rating,
  reviewCount,
  id
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const { deleteMyActivity } = useMyActivities();

  const router = useRouter();

  const handleToggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  const handleDeleteToggleModal = (id: number) => {
    setModalVisible(false);
    deleteMyActivity.mutate(id);
  };

  const handleEdit = () => {
    router.push(`/mypage/activities/${id}/edit`);
  };

  return (
    <li className="w-full aspect-square max-h-[400px] flex flex-col rounded-b-xl shadow-lg bg-white-ffffff">
      <div className="relative flex-1 w-full rounded-t-xl overflow-hidden">
        <Image
          className="w-full object-cover"
          src={bannerImageUrl}
          alt="Activity"
          fill
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="h-full px-4 py-3 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                ⭐ {rating} ({reviewCount})
              </span>
            </div>
            <div className="font-bold text-lg leading-6">{title}</div>
          </div>
          <div className="py-[1px] flex justify-between">
            <span className="text-base font-medium flex justify-center items-center text-gray-4b4b4b dark:text-zinc-300">
              ￦{price.toLocaleString()}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-[100px] flex flex-row-reverse invisible p-0">
                <HiMenu size="24" className="text-black visible" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup>
                  <DropdownMenuRadioItem
                    className="text-sm h-9 md:text-base font-medium focus:bg-sub"
                    value="edit"
                    onSelect={handleEdit}
                  >
                    수정하기
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="text-sm h-9 md:text-base font-medium focus:bg-sub"
                    value="delete"
                    onSelect={handleToggleModal}
                  >
                    삭제하기
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <div className="absolute flex align-middle justify-center">
          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="z-20 bg-black opacity-50 w-full h-full absolute"></div>
            <div className="z-30">
              <AlertModal
                type="decide"
                size="decide"
                text="삭제하시겠습니까?"
                handlerDicideNo={handleToggleModal}
                handelerDicideYes={() => handleDeleteToggleModal(id)}
              />
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default MyActivitiesCard;
