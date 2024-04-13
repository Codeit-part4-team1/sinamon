import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GetActivityDetail } from "@/types/activities";
import ImageView from "@/components/Activities/ImageView/ImageView";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";

interface ImageFieldProps {
  data: GetActivityDetail;
}

const ImageList = ({ data: activityDetailData }: ImageFieldProps) => {
  const [fieldWidth, setFieldWitdh] = useState(0);
  const [imageFieldIndex, setImageFieldIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState({
    banner: true,
    subImage: activityDetailData.subImages.map(() => true)
  });

  const imageRef = useRef<HTMLImageElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const subImageEnable =
    activityDetailData?.subImages && activityDetailData.subImages.length < 1;

  const handleNextClick = () => {
    setImageFieldIndex((prev) => {
      const nextIndex = prev + 1;
      onScroll(fieldWidth, nextIndex);
      return nextIndex;
    });
  };
  const handlePrevClick = () => {
    setImageFieldIndex((prev) => {
      const nextIndex = prev - 1;
      onScroll(fieldWidth, nextIndex);
      return nextIndex;
    });
  };

  const handleImagePopupOpenClick = (url: string) => {
    if (!dialogRef.current) return;
    setImageUrl(url);
    dialogRef.current.showModal();
  };

  const onScroll = (
    width: number,
    index: number,
    initialize: boolean = false
  ) => {
    const container = document.querySelector("#image-field");
    if (!container) return;
    const scrollPosition = width * index;

    if (initialize) {
      container.scrollTo({
        left: scrollPosition,
        behavior: "instant"
      });
      return;
    }
    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth"
    });
  };

  console.log(activityDetailData.subImages.length);

  return (
    <>
      <ImageView dialogRef={dialogRef} imageUrl={imageUrl} />
      {activityDetailData && (
        <div className="flex justify-center items-center relative mt-4 md:mt-8 lg:mt-11 ">
          <div
            id={"image-field"}
            className="flex lg:w-[1198px] lg:h-[534px] w-full h-[310px] rounded-xl md:gap-2 overflow-hidden overflow-x-scroll"
            ref={imageRef}
          >
            {imageFieldIndex !== 0 && (
              <div
                className={`absolute top-1/2 left-4 translate-y-1/2 z-[1] text-[40px] text-primary `}
              >
                <button onClick={handlePrevClick}>
                  <FaArrowLeft />
                </button>
              </div>
            )}
            {activityDetailData.subImages.length > 0 && (
              <div className="absolute top-1/2 right-4 translate-y-1/2 z-[1] text-[40px]">
                <button onClick={handleNextClick}>
                  <FaArrowRight />
                </button>
              </div>
            )}
            <div
              className={`w-full md:w-1/2 md:h-full relative`}
              onClick={() =>
                handleImagePopupOpenClick(activityDetailData.bannerImageUrl)
              }
            >
              <Image
                className={``}
                src={activityDetailData.bannerImageUrl}
                alt={activityDetailData.title}
                sizes={"100%"}
                fill
                priority
                onLoad={() =>
                  setImageLoading((prev) => ({ ...prev, banner: false }))
                }
              />
            </div>
            {!subImageEnable && (
              <div className="flex flex-col w-full md:w-1/2 h-full">
                {activityDetailData.subImages.map(
                  (image) =>
                    image.imageUrl && (
                      <div
                        key={image.id}
                        className={`relative w-full h-full `}
                        onClick={() =>
                          handleImagePopupOpenClick(image.imageUrl)
                        }
                      >
                        <Image
                          className=""
                          src={image.imageUrl}
                          alt={"서브 이미지"}
                          sizes={"100%"}
                          fill
                          priority
                        />
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageList;
