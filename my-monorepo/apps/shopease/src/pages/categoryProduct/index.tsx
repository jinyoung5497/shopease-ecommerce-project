import HomeButton from "../../shared/layout/HomeButton";
import { Layout } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import FilterButton from "./components/FilterButton";
import React, { Suspense } from "react";
import { LoadingSkeleton } from "../../shared/layout/LoadingSkeleton";
import GetCategoryTitle from "./components/GetCategoryTitle";

const CategoryCard = React.lazy(() => import("./components/CategoryCard"));

const CategoryProduct = () => {
  return (
    <Layout>
      <div>
        <NavigationBar />
        <HomeButton style="absolute top-32 left-10" />
        <div className="flex items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">Categories</h1>
        </div>
      </div>
      <div className="mx-14 my-10 text-4xl font-semibold text-primary">
        <GetCategoryTitle />
      </div>
      <FilterButton />
      <Suspense
        fallback={
          <LoadingSkeleton
            numberOfCards={5}
            styles={"grid grid-cols-5 gap-20 items-center mx-40 mb-10"}
          />
        }
      >
        <CategoryCard />
      </Suspense>
    </Layout>
  );
};

export default CategoryProduct;
