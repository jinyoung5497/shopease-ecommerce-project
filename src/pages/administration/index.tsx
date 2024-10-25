import HomeButton from "../common/components/HomeButton";
import { Layout, authStatusType } from "../common/components/Layout";
import NavigationBar from "../common/components/NavigationBar";

const Administration = () => {
  return (
    <Layout authStatus={authStatusType.SELLER}>
      <div>
        <NavigationBar />
        <HomeButton style="absolute top-32 left-10" />
        <div className="flex flex-col items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">
            Administration
          </h1>
          <p>
            관리자 페이지에선 주문 완료된 상품들을 관리할 수 있는 페이지 입니다.
          </p>
        </div>

        <div></div>
      </div>
    </Layout>
  );
};

export default Administration;
