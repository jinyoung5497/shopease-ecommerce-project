import { useFilterStore } from "@/store/filter/useFilterStore";
import HomeButton from "../common/components/HomeButton";
import { Layout } from "../common/components/Layout";
import NavigationBar from "../common/components/NavigationBar";
import FilterList from "./components/FilterList";
import React, { Suspense } from "react";

const CategoryCard = React.lazy(() => import("./components/CategoryCard"));

const CartegoryProduct = () => {
  const { men, women, sneakers, flats, sandals, isFilterTrue } =
    useFilterStore();
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
        {(!isFilterTrue ||
          (!men && !women && !sneakers && !flats && !sandals)) &&
          "All products"}
        {men && !women && !sneakers && !flats && !sandals && "Men's Clothing"}
        {!men && women && !sneakers && !flats && !sandals && "Women's Clothing"}
        {!men && !women && sneakers && !flats && !sandals && "Sneakers"}
        {!men && !women && !sneakers && flats && !sandals && "Flats"}
        {men && !women && !sneakers && !flats && sandals && "Sandals"}
        {!men && !women && !sneakers && !flats && sandals && "Sandals"}
        {[men, women, sneakers, flats, sandals].filter(Boolean).length >= 2 &&
          "Multi filtering"}
      </div>
      <FilterList />
      <Suspense fallback={<LoadingSkeleton />}>
        <CategoryCard />
      </Suspense>
    </Layout>
  );
};

export default CartegoryProduct;

const LoadingSkeleton = () => (
  <div className="grid grid-cols-5 gap-20 items-center justify-items-center mx-40 mb-10">
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="bg-slate-100 rounded-[5px] w-44 h-60 flex items-center justify-center"
      />
    ))}
  </div>
);
