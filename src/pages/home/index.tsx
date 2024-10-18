import { Layout } from "@/pages/common/components/Layout";
import NavigationBar from "../common/components/NavigationBar";
import { useNavigation } from "@/hooks/useNavigation";

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
        <button
          onClick={navToCategoryProduct}
          className="rounded-full text-white bg-primary w-52 p-2 text-sm hover:bg-sky-700"
        >
          All Products
        </button>
      </div>
    </Layout>
  );
};

export default Home;
