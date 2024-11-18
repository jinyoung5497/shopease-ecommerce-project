import { Button } from "@repo/ui/button/Button";
import { Dropdown } from "@repo/ui/dropdown/Dropdown";
import {
  ProductCategoryType,
  useHandleCategory,
} from "../hooks/useHandleCategory";

type MyProductsDropdownProps = {
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ProductCategoryType>
  >;
  selectedCategory?: ProductCategoryType;
};

const MyProductsDropdown = ({
  setSelectedCategory,
  selectedCategory,
}: MyProductsDropdownProps) => {
  const { handleCategory } = useHandleCategory({ setSelectedCategory });
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Button
          variant="outline"
          size="large"
          full
          between
          iconRight={
            <i className="fi fi-rs-angle-small-down text-2xl translate-y-1"></i>
          }
        >
          {selectedCategory ? selectedCategory : "카테고리 선택"}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Title title="Category" />
        <Dropdown.MenuItem asChild value="Men's Clothing">
          <button onClick={() => handleCategory("Men's Clothing")}>
            Men's Clothing
          </button>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem asChild value="Women's Clothing">
          <button onClick={() => handleCategory("Women's Clothing")}>
            Women's Clothing
          </button>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem asChild value="Sneakers">
          <button onClick={() => handleCategory("Sneakers")}>Sneakers</button>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem asChild value="Hat">
          <button onClick={() => handleCategory("Hat")}>Hat</button>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem asChild value="Kids">
          <button onClick={() => handleCategory("Kids")}>Kids</button>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown.Root>
  );
};

export default MyProductsDropdown;
