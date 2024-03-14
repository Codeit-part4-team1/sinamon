import Image from "next/image";

const CardList = () => {
  return (
    <ul className="mb-16 md:mb-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 md:gap-x-5 gap-y-7 md:gap-y-10">
      <li>
        <div className="w-full mb-2 relative rounded-xl overflow-hidden aspect-square">
          <Image
            className="object-cover"
            src={"/images/temp-active-preview.png"}
            alt="temp-active-preview"
            fill
          />
        </div>
        <div className="flex flex-col gap-[2px] md:gap-1">
          <p className="text-xs md:text-sm">
            <span className="text-black font-semibold">⭐ 4.9 </span>
            <span className="text-gray-a4a1aa">(793)</span>
          </p>
          <p className="text-black text-sm md:text-base leading-4 md:leading-5 font-semibold break-keep">
            함께 배우면 즐거운 스트릿 댄스 스트릿 댄스
          </p>
          <p>
            <span className="text-black text-xs md:text-sm font-bold">
              ₩ 38,000
            </span>
            <span className="text-gray-79747e text-xs md:text-sm">
              &nbsp;/ 인
            </span>
          </p>
        </div>
      </li>
      <li className="w-full mb-2 relative rounded-xl overflow-hidden aspect-square bg-sub"></li>
      <li className="w-full mb-2 relative rounded-xl overflow-hidden aspect-square bg-sub"></li>
      <li className="w-full mb-2 relative rounded-xl overflow-hidden aspect-square bg-sub"></li>
      <li className="w-full mb-2 relative rounded-xl overflow-hidden aspect-square bg-sub"></li>
    </ul>
  );
};

export default CardList;
