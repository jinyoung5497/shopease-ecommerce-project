import { pageRoutes } from "@/app/apiRoutes";
import { useNavigation } from "@/shared/hooks/useNavigation";
import { useFetchProducts } from "@/features/product/hooks/useFetchProduct";
import { Button } from "@/shared/components/button/Button";
import CategoryPreviewCards from "./CategoryPreviewCards";

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
            <CategoryPreviewCards
              category={category}
              data={data}
              navToDetailedProduct={navToDetailedProduct}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeCategory;
