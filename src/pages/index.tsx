import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import MainPageLayout from "@/components/layout/MainPageLayout";
import Searchbar from "@/components/home/Searchbar";
import CurationCardList from "@/components/home/CurationCardList";
import CategoryList from "@/components/home/CategoryList";
import SortDropdown from "@/components/home/SortDropdown";
import CardList from "@/components/home/CardList";
import Pagination from "@/components/common/Pagination/Pagination";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Searchbar />
      <CurationCardList />
      <CategoryList />
      <div className="mb-4 md:mb-6 flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-bold">전체</span>
        <SortDropdown />
      </div>
      <CardList />
      <Pagination />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainPageLayout>{page}</MainPageLayout>;
};

export default Home;
