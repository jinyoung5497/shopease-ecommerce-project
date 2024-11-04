import { pageRoutes } from "@/app/apiRoutes";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { useFetchProducts } from "@/features/product/hooks/useFetchProduct";
import { Button } from "@/shared/components/button/Button";

const HomeCategory = () => {
  const { data } = useFetchProducts();
  const { navToFilteredProduct, navToDetailedProduct } = useNavigation();

  const categoryList = [
    "Men's Clothing",
    "Women's Clothing",
    "Sneakers",
    "Hat",
    "Kids",
  ] as const;

  const categoryMap = {
    "Men's Clothing": "men",
    "Women's Clothing": "women",
    Sneakers: "sneakers",
    Hat: "hat",
    Kids: "kids",
  };

  const handleMoreClick = (
    category:
      | "Men's Clothing"
      | "Women's Clothing"
      | "Sneakers"
      | "Hat"
      | "Kids"
  ) => {
    const categoryKey = categoryMap[category];
    navToFilteredProduct(`${pageRoutes.categoryProduct}?filter=${categoryKey}`);
    window.scrollTo({
      top: 0, // 맨 위로 스크롤
      behavior: "smooth", // 부드러운 스크롤 효과
    });
  };

  return (
    <div className="m-20 mx-36">
      {categoryList.map((category, index) => (
        <div key={index}>
          <div className="flex items-center justify-between text-primary">
            <div>{category}</div>
            <Button
              onClick={() => handleMoreClick(category)}
              variant="link"
              size="large"
            >
              더보기
            </Button>
          </div>
          <div className="w-full flex gap-5 items-start justify-between mt-4 mb-20">
            {data
              ?.filter((value) => value.productCategory === category)
              .slice(0, 5)
              .map(
                (
                  value // value는 IProduct 타입
                ) => (
                  <div
                    key={value.id} // 제품의 고유 id를 key로 사용
                    onClick={() => navToDetailedProduct(value.id)}
                    className="flex flex-col gap-1 relative cursor-pointer"
                  >
                    <div className="w-72 flex items-center justify-center">
                      {value.productImages && value.productImages.length > 0 ? (
                        <img
                          src={value.productImages[0]} // 첫 번째 이미지 사용
                          alt="productImage"
                          className=""
                        />
                      ) : (
                        <div className="text-center">
                          No images available for this product
                        </div>
                      )}
                    </div>
                    <div className="text-gray text-[12px]">
                      {value.productCategory}
                    </div>
                    <div className="overflow-clip">{value.productName}</div>
                    <div>
                      {value.productPrice.toLocaleString("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      })}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeCategory;
