import type { Meta } from "@storybook/react";
import { Dropdown } from "@/packages/Dropdown/Dropdown";
const meta: Meta = {
  title: "Components/Dropdown",
  tags: ["autodocs"],
  component: Dropdown.Root, // Dropdown.Root를 메타 데이터로 설정
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          height: "100%",
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
    <Dropdown.Trigger variant="outline">카테고리 선택</Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Title title="Category" />
      <Dropdown.MenuItem>Men's Clothing</Dropdown.MenuItem>
      <Dropdown.MenuItem>Women's Clothing</Dropdown.MenuItem>
      <Dropdown.MenuItem>Sneakers</Dropdown.MenuItem>
      <Dropdown.MenuItem>Hat</Dropdown.MenuItem>
      <Dropdown.MenuItem>Kids</Dropdown.MenuItem>
    </Dropdown.Menu>
  </Dropdown.Root>
);

export const LongList = () => (
  <Dropdown.Root>
    <Dropdown.Trigger>카테고리 선택</Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Title title="Category" />
      <Dropdown.MenuItem>Men's Clothing</Dropdown.MenuItem>
      <Dropdown.MenuItem>Women's Clothing</Dropdown.MenuItem>
      <Dropdown.MenuItem>Sneakers</Dropdown.MenuItem>
      <Dropdown.MenuItem>Hat</Dropdown.MenuItem>
      <Dropdown.MenuItem>Kids1</Dropdown.MenuItem>
      <Dropdown.MenuItem>Kids2</Dropdown.MenuItem>
      <Dropdown.MenuItem>Kids3</Dropdown.MenuItem>
      <Dropdown.MenuItem>Kids4</Dropdown.MenuItem>
      <Dropdown.MenuItem>Kids5</Dropdown.MenuItem>
      <Dropdown.MenuItem>Kids6</Dropdown.MenuItem>
    </Dropdown.Menu>
  </Dropdown.Root>
);

export const ItemWithIcon = () => (
  <Dropdown.Root>
    <Dropdown.Trigger
      rightIcon={
        <div className="rounded-full bg-pink-500 w-4 h-4 -translate-y-1"></div>
      }
    >
      카테고리 선택
    </Dropdown.Trigger>

    <Dropdown.Menu>
      <Dropdown.Title title="Category" />
      <Dropdown.MenuItem
        icon={<div className="rounded-full bg-pink-500 w-4 h-4"></div>}
      >
        Men's Clothing
      </Dropdown.MenuItem>
      <Dropdown.MenuItem
        icon={<div className="rounded-full bg-pink-500 w-4 h-4"></div>}
      >
        Women's Clothing
      </Dropdown.MenuItem>
      <Dropdown.MenuItem
        icon={<div className="rounded-full bg-pink-500 w-4 h-4"></div>}
      >
        Sneakers
      </Dropdown.MenuItem>
      <Dropdown.MenuItem
        icon={<div className="rounded-full bg-pink-500 w-4 h-4"></div>}
      >
        Hat
      </Dropdown.MenuItem>
      <Dropdown.MenuItem
        icon={<div className="rounded-full bg-pink-500 w-4 h-4"></div>}
      >
        Kids
      </Dropdown.MenuItem>
    </Dropdown.Menu>
  </Dropdown.Root>
);
