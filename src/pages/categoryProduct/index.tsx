import HomeButton from "../common/components/HomeButton";
import { Layout } from "../common/components/Layout";
import NavigationBar from "../common/components/NavigationBar";
import CategoryCard from "./components/CategoryCard";
import FilterList from "./components/FilterList";

const CartegoryProduct = () => {
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
        category
      </div>
      <FilterList />
      <CategoryCard />
    </Layout>
  );
};

export default CartegoryProduct;
