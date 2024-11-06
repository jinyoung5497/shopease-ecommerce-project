import { useSearchParams } from "react-router-dom";

const GetCategoryTitle = () => {
  const [searchParams] = useSearchParams();

  const activeFilters = [
    { label: "Men's Clothing", isActive: "men" },
    { label: "Women's Clothing", isActive: "women" },
    { label: "Sneakers", isActive: "sneakers" },
    { label: "Hat", isActive: "hat" },
    { label: "Kids", isActive: "kids" },
  ];

  const selectedFilters = searchParams.getAll("filter");

  if (selectedFilters.length === 0) {
    return "All products";
  } else if (selectedFilters.length === 1) {
    const matchedFilter = activeFilters.find(
      (filter) => filter.isActive === selectedFilters[0]
    );
    return matchedFilter ? matchedFilter.label : "Unknown Category";
  } else {
    return "Multi filtering";
  }
};

export default GetCategoryTitle;
