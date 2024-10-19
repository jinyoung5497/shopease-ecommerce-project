import HomeButton from "../common/components/HomeButton";
import { Layout, authStatusType } from "../common/components/Layout";
import NavigationBar from "../common/components/NavigationBar";
import MyProductsCard from "./components/MyProductsCard";
import RegisterModal from "./components/RegisterModal";

const MyProducts = () => {
  return (
    <Layout authStatus={authStatusType.SELLER}>
      <div>
        <NavigationBar />
        <HomeButton style="absolute top-32 left-10" />
        <div className="flex items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">MyProducts</h1>
        </div>
      </div>

      <RegisterModal />
      <MyProductsCard />
    </Layout>
  );
};

export default MyProducts;
