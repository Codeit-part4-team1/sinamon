import Image from "next/image";
import { useFieldArray } from "react-hook-form";
import { FaPlus, FaXmark } from "react-icons/fa6";

const SubImageUrls = ({ useForm }: any) => {
  const { control, register } = useForm;

  const {
    fields: subImageUrlListFields,
    append: subImageUrlListAppend,
    remove: subImageUrlListRemove
  } = useFieldArray({
    control,
    name: "subImageUrlList"
  });

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
                onChange: () => {
                  useForm.watch("subImageSelect")[0] &&
                    subImageUrlListAppend({
                      subImageUrl: URL?.createObjectURL(
                        useForm.getValues("subImageSelect")[0]
                      )
                    });
                }
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
              <Image
                className="object-cover"
                src={useForm.watch(`subImageUrlList.${index}.subImageUrl`)}
                alt="모임 소개 이미지"
                fill
              />
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

export default SubImageUrls;