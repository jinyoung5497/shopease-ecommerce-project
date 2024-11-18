import HomeButton from "../../shared/layout/HomeButton";
import { Layout } from "../../shared/layout/Layout";
import NavigationBar from "../../shared/layout/NavigationBar";
import { useFetchDetailedProduct } from "@/features/product/hooks/useFetchDetailedProduct";
import { useParams } from "react-router-dom";
import DetailedProductInfo from "./components/DetailedProductInfo";
import DetailedProductRecommend from "./components/DetailedProductRecommend";

const DetailedProduct = () => {
  const { id: productId } = useParams<{ id: string }>();

  if (!productId) throw new Error("productId is required");
  const { data: detailedData } = useFetchDetailedProduct(productId);

  return (
    <Layout>
      <NavigationBar />
      <HomeButton style="absolute top-32 left-10" />
      <DetailedProductInfo detailedData={detailedData} />
      <DetailedProductRecommend detailedData={detailedData} />
    </Layout>
  );
};

export default DetailedProduct;
