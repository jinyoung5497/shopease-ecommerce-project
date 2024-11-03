import { Layout } from "@/shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import { useNavigation } from "@/shared/hooks/useNavigation";
import HomeCategory from "./components/HomeCategory";
import { Button } from "@/shared/components/button/Button";

const Home = () => {
  const { navToCategoryProduct } = useNavigation();

  return (
    <Layout>
      <NavigationBar />
      <div className="w-full flex items-center justify-center flex-col h-[450px] gap-5 border-b-[1px] border-gray-light">
        <h1 className="text-primary font-semibold text-[50px]">
          Style Made Easy.
        </h1>
        <p className="text-primary w-[550px] text-center">
          당신의 스타일을 완성하는 모든 패션 아이템, 이제 쉽고 빠르게
          만나보세요. 어디서나 간편하게 쇼핑하고, 원하는 스타일을 집까지 바로
          받아보세요.
        </p>
        <Button
          onClick={navToCategoryProduct}
          radius="full"
          className="px-[60px]"
        >
          All Products
        </Button>
      </div>
      <HomeCategory />
    </Layout>
  );
};

export default Home;
