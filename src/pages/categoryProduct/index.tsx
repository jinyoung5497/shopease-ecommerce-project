import HomeButton from "../../shared/layout/HomeButton";
import { Layout } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import FilterButton from "./components/FilterButton";
import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { LoadingSkeleton } from "../../shared/layout/LoadingSkeleton";

const CategoryCard = React.lazy(() => import("./components/CategoryCard"));

const CartegoryProduct = () => {
  const [searchParams] = useSearchParams();

  const getTitle = () => {
    const activeFilters = [
      { label: "Men's Clothing", isActive: "men" },
      { label: "Women's Clothing", isActive: "women" },
      { label: "Sneakers", isActive: "sneakers" },
      { label: "Hat", isActive: "hat" },
      { label: "Kids", isActive: "kids" },
    ];

    const selectedFilters = searchParams.getAll("filter");

    if (selectedFilters.length === 0) {
      return "All products";
    } else if (selectedFilters.length === 1) {
      const matchedFilter = activeFilters.find(
        (filter) => filter.isActive === selectedFilters[0]
      );
      return matchedFilter && matchedFilter.label;
    } else {
      return "Multi filtering";
    }
  };

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
        {getTitle()}
      </div>
      <FilterButton />
      <Suspense fallback={<LoadingSkeleton />}>
        <CategoryCard />
      </Suspense>
    </Layout>
  );
};

export default CartegoryProduct;
