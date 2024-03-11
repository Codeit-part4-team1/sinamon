import IconCategoryCulture from "/public/images/icon-category-culture.svg";
import IconCategoryFood from "/public/images/icon-category-food.svg";
import IconCategorySports from "/public/images/icon-category-sports.svg";
import IconCategoryTour from "/public/images/icon-category-tour.svg";
import IconCategorySightseeing from "/public/images/icon-category-sightseeing.svg";
import IconCategoryWellbeing from "/public/images/icon-category-wellbeing.svg";

const CategoryList = () => {
  return (
    <ul className="mb-4 md:mb-6 flex justify-between">
      <li>
        <button className="group">
          <div className="w-12 md:w-[100px] mb-1 md:mb-3 bg-sub flex justify-center items-center aspect-square rounded-full border border-gray-adaeb8 group-hover:border-main">
            <IconCategoryCulture className="w-[24px] md:w-[50px] fill-main" />
          </div>
          <span className="text-xs md:text-lg text-black font-semibold">
            문화·예술
          </span>
        </button>
      </li>
      <li>
        <button className="group">
          <div className="w-12 md:w-[100px] mb-1 md:mb-3 bg-sub flex justify-center items-center aspect-square rounded-full border border-gray-adaeb8 group-hover:border-main">
            <IconCategoryFood className="w-[24px] md:w-[50px] fill-main" />
          </div>
          <span className="text-xs md:text-lg text-black font-semibold">
            식음료
          </span>
        </button>
      </li>
      <li>
        <button className="group">
          <div className="w-12 md:w-[100px] mb-1 md:mb-3 bg-sub flex justify-center items-center aspect-square rounded-full border border-gray-adaeb8 group-hover:border-main">
            <IconCategorySports className="w-[24px] md:w-[50px] fill-main" />
          </div>
          <span className="text-xs md:text-lg text-black font-semibold">
            스포츠
          </span>
        </button>
      </li>
      <li>
        <button className="group">
          <div className="w-12 md:w-[100px] mb-1 md:mb-3 bg-sub flex justify-center items-center aspect-square rounded-full border border-gray-adaeb8 group-hover:border-main">
            <IconCategoryTour className="w-[17px] md:w-[35px] fill-main" />
          </div>
          <span className="text-xs md:text-lg text-black font-semibold">
            투어
          </span>
        </button>
      </li>
      <li>
        <button className="group">
          <div className="w-12 md:w-[100px] mb-1 md:mb-3 bg-sub flex justify-center items-center aspect-square rounded-full border border-gray-adaeb8 group-hover:border-main">
            <IconCategorySightseeing className="w-[28px] md:w-[60px] fill-main" />
          </div>
          <span className="text-xs md:text-lg text-black font-semibold">
            관광
          </span>
        </button>
      </li>
      <li>
        <button className="group">
          <div className="w-12 md:w-[100px] mb-1 md:mb-3 bg-sub flex justify-center items-center aspect-square rounded-full border border-gray-adaeb8 group-hover:border-main">
            <IconCategoryWellbeing className="w-[26px] md:w-[55px] fill-main" />
          </div>
          <span className="text-xs md:text-lg text-black font-semibold">
            웰빙
          </span>
        </button>
      </li>
    </ul>
  );
};

export default CategoryList;
