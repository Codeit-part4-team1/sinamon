import { ReactNode, useState } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import MainPageLayout from "@/components/layout/MainPageLayout";
import Searchbar from "@/components/home/Searchbar";
import CurationCardList from "@/components/home/CurationCardList";
import CategoryList from "@/components/home/CategoryList";
import SortDropdown from "@/components/home/SortDropdown";
import CardList from "@/components/home/CardList";
import Pagination from "@/components/common/Pagination/Pagination";

const Home: NextPageWithLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sort, setSort] = useState("latest");

  return (
    <>
      <Searchbar />
      <CurationCardList />
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="mb-4 md:mb-6 flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-bold">
          {selectedCategory || "전체"}
        </span>
        <SortDropdown sort={sort} setSort={setSort} />
      </div>
      <CardList
        selectedCategory={selectedCategory}
        sort={sort}
      />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainPageLayout>{page}</MainPageLayout>;
};

export default Home;
