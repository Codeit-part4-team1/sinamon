import Image from "next/image";
import { useFormContext } from "react-hook-form";

import { usePostCreateImageUrl } from "@/hooks/activities";

import { FaPlus, FaXmark } from "react-icons/fa6";

const BannerImageUrlField = () => {
  const { formState, register, watch, getValues, setValue } = useFormContext();

  const { mutate } = usePostCreateImageUrl(setValue, "bannerImageUrl");

  const handleCreateImageUrl = () => {
    setValue(
      "bannerImagePreview",
      URL?.createObjectURL(getValues("bannerImageSelect")[0])
    );

    const formData = new FormData();
    formData.append("image", getValues("bannerImageSelect")[0]);
    mutate(formData);
  };

  const henaldeResetValue = () => {
    setValue("bannerImageUrl", "");
    setValue("bannerImagePreview", "");
  };

  return (
    <div className="mt-1">
      <span className="text-lg md:text-xl font-semibold leading-5 md:leading-5">
        배너 이미지
      </span>
      <div className="mt-1">
        {watch("bannerImagePreview") ? (
          <div className="group w-fit relative flex-shrink-0 list-none rounded-md overflow-hidden">
            <div className="w-[156px] aspect-square relative">
              <Image
                className="object-cover"
                src={watch("bannerImagePreview")}
                alt="모임 배너 이미지"
                fill
                sizes="100%"
              />
            </div>
            <button
              className="hidden absolute w-full top-0 aspect-square justify-center items-center bg-black/50 rounded-md group-hover:flex"
              type="button"
              onClick={henaldeResetValue}
            >
              <FaXmark className="text-white-ffffff text-xl md:text-2xl" />
            </button>
          </div>
        ) : (
          <div className="group relative w-fit flex-shrink-0 list-none">
            <label
              className="w-[156px] aspect-square flex bg-white-ffffff rounded-md border border-gray-a4a1aa border-dashed cursor-pointer"
              htmlFor="bannerImageSelect"
            >
              <FaPlus className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-cbc9cf text-xl md:text-2xl group-hover:text-main" />
            </label>
            <input
              className="hidden"
              id="bannerImageSelect"
              type="file"
              accept="image/*"
              {...register("bannerImageSelect", {
                onChange: handleCreateImageUrl
              })}
            />

            <span className="absolute mt-1 text-xs md:text-sm font-medium md:leading-4 text-destructive whitespace-nowrap">
              {formState.errors.bannerImageUrl?.message?.toString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerImageUrlField;
