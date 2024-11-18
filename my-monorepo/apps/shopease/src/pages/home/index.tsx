import { Layout } from "@/shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import HomeCategory from "./components/HomeCategory";
import HomeTitle from "./components/HomeTitle";

const Home = () => {
  return (
    <Layout>
      <NavigationBar />
      <HomeTitle />
      <HomeCategory />
    </Layout>
  );
};

export default Home;
