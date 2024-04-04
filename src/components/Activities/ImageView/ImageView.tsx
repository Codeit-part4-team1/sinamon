import { RefObject } from "react";
import Image from "next/image";

interface ImageViewProps {
  imageUrl: string | null;
  dialogRef: RefObject<HTMLDialogElement>;
}

const ImageView = ({ imageUrl, dialogRef }: ImageViewProps) => {
  const handleCloseClick = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };
  return (
    <>
      <dialog
        className="fixed top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 w-4/5 h-4/5"
        ref={dialogRef}
        onClick={handleCloseClick}
      >
        <div className="relative w-full h-full">
          {imageUrl && (
            <Image
              className="w-full h-full  object-contain"
              sizes="100%"
              src={imageUrl}
              alt={"이미지 팝업으로 보기"}
              fill
              priority
            />
          )}
        </div>
      </dialog>
    </>
  );
};

export default ImageView;
