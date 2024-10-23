import { useFilterStore } from "@/store/filter/useFilterStore";

const CategoryFilterButton = () => {
  const {
    men,
    women,
    sneakers,
    hat,
    top,
    isMen,
    isWomen,
    isSneakers,
    isHat,
    isTop,
    isFilterTrue,
    setIsFilterTrue,
  } = useFilterStore();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          setIsFilterTrue();
          isMen();
        }}
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center ${
          men && isFilterTrue && "bg-primary text-white"
        }`}
      >
        Men's
      </button>
      <button
        onClick={() => {
          setIsFilterTrue();
          isWomen();
        }}
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center ${
          women && isFilterTrue && "bg-primary text-white"
        }`}
      >
        Women's
      </button>
      <button
        onClick={() => {
          setIsFilterTrue();
          isSneakers();
        }}
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center ${
          sneakers && isFilterTrue && "bg-primary text-white"
        }`}
      >
        Sneakers
      </button>
      <button
        onClick={() => {
          setIsFilterTrue();
          isHat();
        }}
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center ${
          hat && isFilterTrue && "bg-primary text-white"
        }`}
      >
        Hat
      </button>
      <button
        onClick={() => {
          setIsFilterTrue();
          isTop();
        }}
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center ${
          top && isFilterTrue && "bg-primary text-white"
        }`}
      >
        Top
      </button>
    </div>
  );
};

export default CategoryFilterButton;
