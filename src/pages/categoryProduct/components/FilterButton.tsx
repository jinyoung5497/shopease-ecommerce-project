import { useSearchParams } from "react-router-dom";

const FilterList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedFilters = searchParams.getAll("filter");

  type NewFilterType = "men" | "women" | "sneakers" | "hat" | "kids";

  const toggleFilter = (newFilter: NewFilterType) => {
    const updatedFilters = selectedFilters.includes(newFilter)
      ? selectedFilters.filter((f) => f !== newFilter) // 필터 해제
      : [...selectedFilters, newFilter]; // 필터 추가

    setSearchParams({ filter: updatedFilters }); // URL 업데이트
  };

  const FilterButton = ({
    filter,
    label,
  }: {
    filter: NewFilterType;
    label: string;
  }) => {
    const isActive = selectedFilters.includes(filter);

    return (
      <button
        onClick={() => {
          toggleFilter(filter);
        }}
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center ${
          isActive && "bg-primary text-white"
        }`}
      >
        {label}
      </button>
    );
  };

  const FilterLabelButton = () => {
    return (
      <>
        {selectedFilters.map((value, index) => (
          <div key={index} className="flex">
            <button
              onClick={() => {
                toggleFilter(value as NewFilterType);
              }}
              className="w-fit hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-full border-[1px] flex items-center justify-center"
            >
              {value}
              <i className="fi fi-rs-cross-small translate-y-[3px]"></i>
            </button>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-start gap-4 mx-14">
      <div className="flex gap-4">
        <FilterButton filter="men" label="Men's" />
        <FilterButton filter="women" label="Women's" />
        <FilterButton filter="sneakers" label="Sneakers" />
        <FilterButton filter="hat" label="Hat" />
        <FilterButton filter="kids" label="Kids" />
      </div>
      <div className="flex gap-4 mb-10">
        <FilterLabelButton />
      </div>
    </div>
  );
};

export default FilterList;
