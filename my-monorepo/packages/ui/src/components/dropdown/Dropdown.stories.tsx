import type { Meta } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { ChevronDown } from "lucide-react";
import { Button } from "../button/Button";
import { useState } from "react";
const meta: Meta = {
  title: "Components/Dropdown",
  tags: ["autodocs"],
  component: Dropdown.Root, // Dropdown.Root를 메타 데이터로 설정
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          gap: "10px",
          height: "200px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta; // 메타 데이터 내보내기

export const Basic = () => (
  <Dropdown.Root>
    <Dropdown.Trigger>
      <Button variant="outline">카테고리 선택</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Title title="Category" />
      <Dropdown.MenuItem value="Men's Clothing">
        Men's Clothing
      </Dropdown.MenuItem>
      <Dropdown.MenuItem value="Women's Clothing">
        Women's Clothing
      </Dropdown.MenuItem>
      <Dropdown.MenuItem value="Sneakers">Sneakers</Dropdown.MenuItem>
      <Dropdown.MenuItem value="Hat">Hat</Dropdown.MenuItem>
      <Dropdown.MenuItem value="Kids">Kids</Dropdown.MenuItem>
    </Dropdown.Menu>
  </Dropdown.Root>
);

export const LongList = () => (
  <Dropdown.Root>
    <Dropdown.Trigger>카테고리 선택</Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Title title="Category" />
      <Dropdown.MenuItem value="Men's Clothing">
        Men's Clothing
      </Dropdown.MenuItem>
      <Dropdown.MenuItem value="Women's Clothing">
        Women's Clothing
      </Dropdown.MenuItem>
      <Dropdown.MenuItem value="Sneakers">Sneakers</Dropdown.MenuItem>
      <Dropdown.MenuItem value="Hat">Hat</Dropdown.MenuItem>
      <Dropdown.MenuItem value="Kids1">Kids1</Dropdown.MenuItem>
      <Dropdown.MenuItem value="Kids2">Kids2</Dropdown.MenuItem>
      <Dropdown.MenuItem value="Kids3">Kids3</Dropdown.MenuItem>
      <Dropdown.MenuItem value="Kids4">Kids4</Dropdown.MenuItem>
      <Dropdown.MenuItem value="Kids5">Kids5</Dropdown.MenuItem>
      <Dropdown.MenuItem value="Kids6">Kids6</Dropdown.MenuItem>
    </Dropdown.Menu>
  </Dropdown.Root>
);

export const controlledDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <Dropdown.Root
        controlledOpen={open}
        setControlledOpen={setOpen}
        value={value}
        onValueChange={setValue}
      >
        <Dropdown.Trigger>카테고리 선택</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Title title="Category" />
          <Dropdown.MenuItem value="Men's Clothing">
            <Button variant="link" onClick={() => setValue("Men's Clothing")}>
              Men's Clothing
            </Button>
          </Dropdown.MenuItem>
          <Dropdown.MenuItem value="Women's Clothing">
            <Button variant="link" onClick={() => setValue("Women's Clothing")}>
              Women's Clothing
            </Button>
          </Dropdown.MenuItem>
          <Dropdown.MenuItem value="Sneakers">
            <Button variant="link" onClick={() => setValue("Sneakers")}>
              Sneakers
            </Button>
          </Dropdown.MenuItem>
          <Dropdown.MenuItem value="Hat">
            <Button variant="link" onClick={() => setValue("Hat")}>
              Hat
            </Button>
          </Dropdown.MenuItem>
        </Dropdown.Menu>
      </Dropdown.Root>
    </>
  );
};

export const ItemWithIcon = () => (
  <Dropdown.Root>
    <Dropdown.Trigger>
      <Button iconRight={<ChevronDown />}>카테고리 선택</Button>
    </Dropdown.Trigger>

    <Dropdown.Menu>
      <Dropdown.Title title="Category" />
      <Dropdown.MenuItem value="Men's Clothing">
        <Button variant="link" iconLeft={<ChevronDown />}>
          Men's Clothing
        </Button>
      </Dropdown.MenuItem>
      <Dropdown.MenuItem value="Women's Clothing">
        <Button variant="link" iconLeft={<ChevronDown />}>
          Women's Clothing
        </Button>
      </Dropdown.MenuItem>
      <Dropdown.MenuItem value="Sneakers">
        <Button variant="link" iconLeft={<ChevronDown />}>
          Sneakers
        </Button>
      </Dropdown.MenuItem>
      <Dropdown.MenuItem value="Hat">
        <Button variant="link" iconLeft={<ChevronDown />}>
          Hat
        </Button>
      </Dropdown.MenuItem>
      <Dropdown.MenuItem value="Kids">
        <Button variant="link" iconLeft={<ChevronDown />}>
          Kids
        </Button>
      </Dropdown.MenuItem>
    </Dropdown.Menu>
  </Dropdown.Root>
);
