import { useDetailedProductInfo } from "@/hooks/useDetailedProductInfo";
import { useNavigation } from "@/hooks/useNavigation";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";

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
  const {
    setMenTrue,
    setWomenTrue,
    setSneakersTrue,
    setFlatsTrue,
    setSandalsTrue,
  } = useFilterStore();

  const handleMoreClick = (category: string) => {
    navToCategoryProduct();
    window.scrollTo({
      top: 0, // 맨 위로 스크롤
      behavior: "smooth", // 부드러운 스크롤 효과
    });

    if (category === "Men's Clothing") {
      setMenTrue();
    } else if (category === "Women's Clothing") {
      setWomenTrue();
    } else if (category === "Sneakers") {
      setSneakersTrue();
    } else if (category === "Flats") {
      setFlatsTrue();
    } else if (category === "Sandals") {
      setSandalsTrue();
    }
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
            {data
              ?.filter((value) => value.productCategory === category)
              .slice(0, 4)
              .map(
                (
                  value,
                  idx: number // value는 IProduct 타입
                ) => (
                  <div
                    key={value.id} // 제품의 고유 id를 key로 사용
                    onClick={() => handleProductCardClick(value, idx)}
                    className="flex flex-col gap-1 relative cursor-pointer"
                  >
                    <div className="border-[1px] border-gray-light rounded-[5px] w-44 h-60 flex items-center justify-center">
                      {value.productImages && value.productImages.length > 0 ? (
                        <img
                          src={value.productImages[0]} // 첫 번째 이미지 사용
                          alt="productImage"
                          className="w-32 h-32"
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
                    <div>{value.productName}</div>
                    <div>$ {value.productPrice}</div>
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