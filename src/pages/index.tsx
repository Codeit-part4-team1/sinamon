import { ReactNode, useState } from "react";

import type { NextPageWithLayout } from "@/pages/_app";
import MainPageLayout from "@/components/layout/MainPageLayout";
import Searchbar from "@/components/home/Searchbar";
import CurationCardList from "@/components/home/CurationCardList";
import CategoryList from "@/components/home/CategoryList";
import SortDropdown from "@/components/home/SortDropdown";
import CardList from "@/components/home/CardList";

const Home: NextPageWithLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sort, setSort] = useState("latest");
  const [keyword, setKeyword] = useState("");
  const [totalDataCount, setTotalDataCount] = useState(0);

  return (
    <>
      <Searchbar setKeyword={setKeyword} />
      {keyword && (
        <p className="text-md md:text-xl mb-7 md:mb-11">
          {selectedCategory && (
            <>
              <span className="font-semibold">{selectedCategory}</span> 모임{" "}
            </>
          )}
          <span className="font-bold">{keyword}</span>에 대해 총{" "}
          {totalDataCount}건의 검색결과가 있습니다.
        </p>
      )}
      {keyword ? <></> : <CurationCardList />}
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
        keyword={keyword}
        setTotalDataCount={setTotalDataCount}
      />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainPageLayout>{page}</MainPageLayout>;
};

export default Home;
