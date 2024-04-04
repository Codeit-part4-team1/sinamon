import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GetActivityDetail } from "@/types/activities";
import ImageView from "@/components/Activities/ImageView/ImageView";

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
  function debounce(callback: () => void, time: number) {
    let timmer: NodeJS.Timeout;

    return () => {
      clearTimeout(timmer);
      timmer = setTimeout(() => {
        callback();
      }, time);
    };
  }

  const imageRef = useRef<HTMLImageElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const nextButtonEnable =
    activityDetailData?.subImages &&
    activityDetailData.subImages.length > 0 &&
    activityDetailData.subImages.length - imageFieldIndex !== 0;

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

  const handleResize = debounce(() => {
    if (window.innerWidth < 768 && imageRef.current) {
      const { clientWidth } = imageRef.current;
      setFieldWitdh(clientWidth);
      setImageFieldIndex(0);
      onScroll(0, 0, true);
    }
  }, 100);

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

  useEffect(() => {
    if (!activityDetailData && !imageRef.current) return;
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activityDetailData, imageRef]);

  return (
    <>
      <ImageView dialogRef={dialogRef} imageUrl={imageUrl} />
      {activityDetailData && (
        <div className="flex h-[310px] lg:h-[534px] justify-center items-center relative">
          <div
            id={"image-field"}
            className="flex overflow-y-hidden overflow-x-scroll max-w-[1198px] md:max-h-[310px] lg:max-h-[534px] w-full h-full md:grid grid-cols-[1fr,1fr] gap-0 md:gap-2 overflow-hidden rounded-xl "
            ref={imageRef}
          >
            {imageFieldIndex !== 0 && (
              <div className="md:inline md:absolute md:top-1/2 md:left-4 md:translate-y-1/2 md:z-[1] lg:hidden">
                <button onClick={handlePrevClick}> 1 </button>
              </div>
            )}
            {nextButtonEnable && (
              <div className="md:inline md:absolute md:top-1/2 md:left-4 md:translate-y-1/2 md:z-[1] lg:hidden">
                <button onClick={handleNextClick}> 2 </button>
              </div>
            )}
            <div
              className=""
              onClick={() =>
                handleImagePopupOpenClick(activityDetailData.bannerImageUrl)
              }
            >
              <Image
                className=""
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
              <div className="">
                {activityDetailData.subImages.map(
                  (image, index) =>
                    image.imageUrl && (
                      <div
                        key={image.id}
                        className=""
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
                          onLoad={() =>
                            setImageLoading((prev) => ({
                              ...prev,
                              subImage: { ...prev.subImage, [index]: false }
                            }))
                          }
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
