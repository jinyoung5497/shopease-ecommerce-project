import CategoryFilterButton from "./CategoryFilterButton";
import SortByDropDown from "./SortByDropDown";

const FilterList = () => {
  return (
    <div className="flex items-center gap-4 m-14">
      <SortByDropDown />
      <CategoryFilterButton />
    </div>
  );
};

export default FilterList;
