import type { Meta } from "@storybook/react";
import { Carousel } from "./Carousel";
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

const imageList = [
  "https://firebasestorage.googleapis.com/v0/b/shopease-a98db.appspot.com/o/products%2F4e8ada81-024d-42a5-afb6-8325b695e6e3%2FTHERMOLOCK%20C%20(%E1%84%8A%E1%85%A5%E1%84%86%E1%85%A9%E1%84%85%E1%85%A1%E1%86%A8%20C)%20%E1%84%8B%E1%85%A7%E1%84%89%E1%85%A5%E1%86%BC%20%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%B7%20%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%20%E1%84%89%E1%85%A7%E1%84%8F%E1%85%A6%E1%86%BA%201.webp?alt=media&token=49008d2c-4494-436c-99b3-3bbadefcf51b",
  "https://firebasestorage.googleapis.com/v0/b/shopease-a98db.appspot.com/o/products%2Ff8c0998e-b063-4cde-a261-9ee888ed86f6%2FTHERMOLOCK%20C%20(%E1%84%8A%E1%85%A5%E1%84%86%E1%85%A9%E1%84%85%E1%85%A1%E1%86%A8%20C)%20%E1%84%8B%E1%85%A7%E1%84%89%E1%85%A5%E1%86%BC%20%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%B7%20%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%20%E1%84%8C%E1%85%A1%E1%84%8F%E1%85%A6%E1%86%BA%20(Cream)%201.webp?alt=media&token=571addc3-0572-4ddc-ac21-a27d0bbe3585",
];

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
