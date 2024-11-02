import type { Meta } from "@storybook/react";
import { Sheet } from "@/packages/Sheet/Sheet";
import { Button } from "@/packages/button/Button";
import { ShoppingBasket, X } from "lucide-react";
const meta: Meta = {
  title: "Components/Sheet",
  tags: ["autodocs"],
  component: Sheet.Root, // Sheet.Root를 메타 데이터로 설정
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
  <Sheet.Root>
    <Sheet.Trigger variant="link">
      <ShoppingBasket className="h-5 w-5" />
    </Sheet.Trigger>
    <Sheet.Content>
      <Sheet.Close topRight>
        <X className="h-5 w-5" />
      </Sheet.Close>
      <Sheet.Header>
        <Sheet.Title title="Cart" />
      </Sheet.Header>
      <Sheet.Divider />
      <Sheet.Items>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 1</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 2</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 3</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 4</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 4</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 4</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 4</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 4</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 4</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 4</div>
        <div className="py-2 bg-black  w-full h-[60px]">Cart item 4</div>
      </Sheet.Items>
      <Sheet.Footer>
        <Button radius="none" size="large" full>
          Checkout
        </Button>
      </Sheet.Footer>
    </Sheet.Content>
  </Sheet.Root>
);