import type { Meta } from "@storybook/react";
import { Modal } from "@/shared/components/modal/Modal";
import { Input } from "@/shared/components/input/Input";
import { Button } from "@/shared/components/button/Button";
import { X } from "lucide-react";
const meta: Meta = {
  title: "Components/Modal",
  tags: ["autodocs"],
  component: Modal.Root, // Modal.Root를 메타 데이터로 설정
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
  <Modal.Root>
    <Modal.Trigger variant="outline">상품 추가</Modal.Trigger>
    <Modal.Content>
      <Modal.Close topRight>
        <X className="h-5 w-5" />
      </Modal.Close>
      <Modal.Header>
        <Modal.Title title="상품 등록" />
        <Modal.Description description="상품 상세 정보를 입력하여 상품을 등록하세요" />
      </Modal.Header>
      <Modal.Divider />
      <Modal.Items>
        <Input label="상품 이름" placeholder="상품 이름" full />
        <Input label="상품 설명" placeholder="상품 설명" full />
        <Input label="상품 재고" placeholder="상품 재고" full />
        <Input label="상품 가격" placeholder="상품 가격" full />
      </Modal.Items>
      <Modal.Footer>
        <Button full>등록하기</Button>
      </Modal.Footer>
    </Modal.Content>
  </Modal.Root>
);
