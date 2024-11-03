import type { Meta } from "@storybook/react";
import { Carousel } from "@/shared/components/Carousel/Carousel";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
const meta: Meta = {
  title: "Components/Carousel",
  tags: ["autodocs"],
  component: Carousel.Root, // Carousel.Root를 메타 데이터로 설정
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

const imageList = ["image1", "image2", "image3"];

export const Basic = () => (
  <Carousel.Root>
    <Carousel.Previous images={imageList}>
      <ArrowBigLeft />
    </Carousel.Previous>
    <Carousel.Content>
      <Carousel.Items images={imageList} />
    </Carousel.Content>
    <Carousel.Next images={imageList}>
      <ArrowBigRight />
    </Carousel.Next>
  </Carousel.Root>
);
