import { useFilterStore } from "@/store/filter/useFilterStore";

const CategoryFilterButton = () => {
  const {
    men,
    women,
    sneakers,
    flats,
    sandals,
    isMen,
    isWomen,
    isSneakers,
    isFlats,
    isSandals,
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
          isFlats();
        }}
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center ${
          flats && isFilterTrue && "bg-primary text-white"
        }`}
      >
        Flats
      </button>
      <button
        onClick={() => {
          setIsFilterTrue();
          isSandals();
        }}
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center ${
          sandals && isFilterTrue && "bg-primary text-white"
        }`}
      >
        Sandals
      </button>
    </div>
  );
};

export default CategoryFilterButton;
