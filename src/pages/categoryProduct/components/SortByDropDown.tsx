import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const SortByDropDown = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("최신순");

  const handleFilterClick = (
    event: React.MouseEvent<HTMLDivElement>,
    filterButton: string
  ) => {
    event.preventDefault();
    setSelectedCategory(filterButton);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-full px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center">
          {selectedCategory}
          <i className="fi fi-rs-angle-small-down text-2xl translate-y-1"></i>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(event) => handleFilterClick(event, "최신순")}
        >
          최신순
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => handleFilterClick(event, "가격순")}
        >
          가격순
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortByDropDown;
