import { useFilterStore } from "@/store/filter/useFilterStore";
import CategoryFilterButton from "./CategoryFilterButton";
import SortByDropDown from "./SortByDropDown";

const FilterList = () => {
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
  } = useFilterStore();

  return (
    <>
      <div className="flex items-center gap-4 mx-14 mt-14">
        <SortByDropDown />
        <CategoryFilterButton />
      </div>
      <div className="flex gap-4 my-5 mx-14">
        {men && (
          <button
            onClick={isMen}
            className="w-fit hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-full border-[1px] flex items-center justify-center"
          >
            Men's
            <i className="fi fi-rs-cross-small translate-y-[3px]"></i>
          </button>
        )}
        {women && (
          <button
            onClick={isWomen}
            className="w-fit hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-full border-[1px] flex items-center justify-center"
          >
            Women's
            <i className="fi fi-rs-cross-small translate-y-[3px]"></i>
          </button>
        )}
        {sneakers && (
          <button
            onClick={isSneakers}
            className="w-fit hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-full border-[1px] flex items-center justify-center"
          >
            Sneakers
            <i className="fi fi-rs-cross-small translate-y-[3px]"></i>
          </button>
        )}
        {flats && (
          <button
            onClick={isFlats}
            className="w-fit hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-full border-[1px] flex items-center justify-center"
          >
            Flats
            <i className="fi fi-rs-cross-small translate-y-[3px]"></i>
          </button>
        )}
        {sandals && (
          <button
            onClick={isSandals}
            className="w-fit hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-full border-[1px] flex items-center justify-center"
          >
            Sandals
            <i className="fi fi-rs-cross-small translate-y-[3px]"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default FilterList;