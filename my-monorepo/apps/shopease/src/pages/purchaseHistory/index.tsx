import HomeButton from "../../shared/layout/HomeButton";
import { Layout, authStatusType } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import PurchaseHistoryList from "./components/PurchaseHistoryList";

const PurchaseHistory = () => {
  return (
    <Layout authStatus={authStatusType.BUYER}>
      <NavigationBar />
      <HomeButton style="absolute top-32 left-10" />
      <div className="flex items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
        <h1 className="text-primary font-semibold text-[50px]">
          PurchaseHistory
        </h1>
      </div>
      <PurchaseHistoryList />
    </Layout>
  );
};

export default PurchaseHistory;
