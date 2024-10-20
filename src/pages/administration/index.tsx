import HomeButton from "../common/components/HomeButton";
import { Layout, authStatusType } from "../common/components/Layout";
import NavigationBar from "../common/components/NavigationBar";

const Administration = () => {
  return (
    <Layout authStatus={authStatusType.SELLER}>
      <div>
        <NavigationBar />
        <HomeButton style="absolute top-32 left-10" />
        <div className="flex items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">
            Administration
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default Administration;
