import { Toggle } from "@/shared/components/toggle/Toggle";
import { Button } from "@/shared/components/button/Button";
import { useSearchParams } from "react-router-dom";

const FilterButton = () => {
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
      <Toggle
        onClick={() => {
          toggleFilter(filter);
        }}
        className=""
        isActive={isActive}
        size="medium"
      >
        {label}
      </Toggle>
    );
  };

  const FilterLabelButton = () => {
    return (
      <>
        {selectedFilters.map((value, index) => (
          <Button
            key={index}
            onClick={() => {
              toggleFilter(value as NewFilterType);
            }}
            variant="outline"
            size="medium"
            radius="full"
          >
            {value}
            <i className="fi fi-rs-cross-small translate-y-[3px]"></i>
          </Button>
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

export default FilterButton;
