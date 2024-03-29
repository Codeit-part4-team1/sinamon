import { useEffect } from "react";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";

import { useActivities } from "@/hooks/useActivities";

import { FaPlus, FaXmark } from "react-icons/fa6";

const SubImageUrlsField = ({ data }: any) => {
  const { control, register, watch, getValues, setValue } = useFormContext();

  const {
    fields: subImageUrlListFields,
    append: subImageUrlListAppend,
    remove: subImageUrlListRemove,
    replace: subImageUrlListRePlace
  } = useFieldArray({
    control,
    name: "subImageUrlList"
  });

  const { mutate } = useActivities.createImageUrl(
    setValue,
    "subImageUrl",
    getValues,
    subImageUrlListAppend
  );

  const handleCreateImageUrl = () => {
    if (watch("subImageSelect")[0]) {
      const formData = new FormData();
      formData.append("image", getValues("subImageSelect")[0]);
      mutate(formData);
    }
  };

  useEffect(() => {
    if (data) {
      subImageUrlListRePlace(data);
      data.forEach((subImage: any, index: any) => {
        setValue(`subImageUrlList.${index}.subImagePreview`, subImage.imageUrl);
        setValue(`subImageUrlList.${index}.subImageUrl`, subImage.imageUrl);
        setValue(`subImageUrls`, subImage.imageUrl);
      });
      setValue(`subImageiInitial`, getValues(`subImageUrlList`));
    }
  }, [data]);

  return (
    <div className="mt-1">
      <span className="text-lg md:text-xl font-semibold leading-5 md:leading-5">
        소개 이미지
      </span>
      <ul className="mt-1 flex flex-wrap gap-2 md:gap-4">
        {subImageUrlListFields.length < 4 && (
          <li className="group relative w-fit flex-shrink-0 list-none">
            <label
              className="w-[156px] aspect-square flex bg-white-ffffff rounded-md border border-gray-a4a1aa border-dashed cursor-pointer"
              htmlFor="subImageSelect"
            >
              <FaPlus className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-cbc9cf text-xl md:text-2xl group-hover:text-main" />
            </label>
            <input
              className="hidden"
              id="subImageSelect"
              type="file"
              accept="image/*"
              {...register("subImageSelect", {
                onChange: handleCreateImageUrl
              })}
            />
          </li>
        )}
        {subImageUrlListFields.map((item, index) => (
          <li
            className="group relative flex-shrink-0 list-none rounded-md overflow-hidden"
            key={item.id}
          >
            <div className="w-[156px] aspect-square relative">
              {watch(`subImageUrlList.${index}.subImagePreview`) && (
                <Image
                  className="object-cover"
                  src={watch(`subImageUrlList.${index}.subImagePreview`)}
                  alt="모임 소개 이미지"
                  fill
                  sizes="100%"
                />
              )}
            </div>
            <button
              className="hidden absolute w-full top-0 aspect-square justify-center items-center bg-black/50 rounded-md group-hover:flex"
              type="button"
              onClick={() => subImageUrlListRemove(index)}
            >
              <FaXmark className="text-white-ffffff text-xl md:text-2xl" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubImageUrlsField;
