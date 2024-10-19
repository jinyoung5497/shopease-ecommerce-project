import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";

const CategoryCard = () => {
  const { data } = useFetchProducts();

  return (
    <div className="grid grid-cols-5 gap-20 items-center justify-items-center mx-40">
      {data?.map((value, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 relative cursor-pointer"
        >
          <div className="border-[1px] border-gray-light rounded-[5px] w-44 h-60 flex items-center justify-center">
            <img
              src={value.productImage}
              alt="productImage"
              className="w-32 h-32"
            />
          </div>
          <div className="text-gray text-[12px]">{value.productCategory}</div>
          <div>{value.productName}</div>
          <div>$ {value.productPrice}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
