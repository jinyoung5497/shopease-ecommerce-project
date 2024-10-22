import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";
import { useDetailedProductInfo } from "@/hooks/useDetailedProductInfo";
import { useNavigation } from "@/hooks/useNavigation";

const HomeCategory = () => {
  const { data } = useFetchProducts();
  const { handleProductCardClick } = useDetailedProductInfo();
  const { navToCategoryProduct } = useNavigation();
  const categoryList = [
    "Men's Clothing",
    "Women's Clothing",
    "Sneakers",
    "Flats",
    "Sandals",
  ];

  const handleMoreClick = (category: string) => {
    navToCategoryProduct();
    window.scrollTo({
      top: 0, // 맨 위로 스크롤
      behavior: "smooth", // 부드러운 스크롤 효과
    });
  };

  return (
    <div className="m-20">
      {categoryList.map((category, index) => (
        <div key={index}>
          <div className="flex items-center justify-between text-primary">
            <div>{category}</div>
            <button onClick={() => handleMoreClick(category)}>더보기</button>
          </div>
          <div className="flex gap-28 items-center justify-start m-10 mb-20">
            {data?.pages[0].products
              .filter((value) => value.productCategory == category)
              .map((value, index) => (
                <div
                  key={value.id} // 제품마다 고유한 id를 key로 사용
                  onClick={() => handleProductCardClick(value, index)}
                  className="flex flex-col gap-1 relative cursor-pointer"
                >
                  <div className="border-[1px] border-gray-light rounded-[5px] w-44 h-60 flex items-center justify-center">
                    {value.productImages && value.productImages.length > 0 ? (
                      <img
                        src={value.productImages[0]}
                        alt="productImage"
                        className="w-32 h-32"
                      />
                    ) : (
                      <div className="text-center">
                        There are no images for this product
                      </div>
                    )}
                  </div>
                  <div className="text-gray text-[12px]">
                    {value.productCategory}
                  </div>
                  <div>{value.productName}</div>
                  <div>$ {value.productPrice}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeCategory;
