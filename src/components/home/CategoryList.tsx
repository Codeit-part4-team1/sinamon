import IconCategoryCulture from "/public/images/icon-category-culture.svg";
import IconCategoryFood from "/public/images/icon-category-food.svg";
import IconCategorySports from "/public/images/icon-category-sports.svg";
import IconCategoryTour from "/public/images/icon-category-tour.svg";
import IconCategorySightseeing from "/public/images/icon-category-sightseeing.svg";
import IconCategoryWellbeing from "/public/images/icon-category-wellbeing.svg";

import { cn } from "@/lib/utils";

interface CategoryListProps {
  selectedCategory: string | null;
  setSelectedCategory: (prev: any) => void;
  setSelectPage: (prev: number) => void;
}
interface CategoryList {
  id: number;
  name: string;
  size: string;
  icon: any;
}

const categories = [
  {
    id: 1,
    name: "문화 · 예술",
    size: "w-[24px] md:w-[50px]",
    icon: IconCategoryCulture
  },
  {
    id: 2,
    name: "식음료",
    size: "w-[24px] md:w-[50px]",
    icon: IconCategoryFood
  },
  {
    id: 3,
    name: "스포츠",
    size: "w-[24px] md:w-[50px]",
    icon: IconCategorySports
  },
  { id: 4, name: "투어", size: "w-[17px] md:w-[35px]", icon: IconCategoryTour },
  {
    id: 5,
    name: "관광",
    size: "w-[28px] md:w-[60px]",
    icon: IconCategorySightseeing
  },
  {
    id: 6,
    name: "웰빙",
    size: "w-[26px] md:w-[55px]",
    icon: IconCategoryWellbeing
  }
];

const CategoryList = ({
  selectedCategory,
  setSelectedCategory,
  setSelectPage
}: CategoryListProps) => {
  const handleCategoryClick = (category: CategoryList) => {
    setSelectedCategory((prevSelectedCategory: string) =>
      prevSelectedCategory === category.name ? null : category.name
    );
    setSelectPage(1);
  };

  return (
    <ul className="mb-4 md:mb-6 flex justify-between">
      {categories.map((category) => (
        <li key={category.id}>
          <button
            className={`group ${selectedCategory === category.name ? "text-main" : "text-black"}`}
            onClick={() => handleCategoryClick(category)}
          >
            <div
              className={cn(
                "w-12 md:w-[100px] mb-1 md:mb-3 bg-sub flex justify-center items-center aspect-square rounded-full border border-gray-adaeb8 group-hover:border-main ",
                selectedCategory === category.name && "border-main"
              )}
            >
              <category.icon className={`${category.size} fill-main`} />
            </div>
            <span className="text-xs md:text-base font-semibold">
              {category.name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
// export default CategoryList;
