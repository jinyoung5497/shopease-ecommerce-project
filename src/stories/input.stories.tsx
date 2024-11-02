import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/shared/components/Input/Input";
import { InputProps } from "@/shared/components/Input/InputProps";
import { FieldError } from "react-hook-form";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  tags: ["autodocs"],
  component: Input,
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

export default meta;
type Story = StoryObj<InputProps>;

export const Basic: Story = {
  args: {},
};

export const label = () => (
  <>
    <Input label="Login" />
  </>
);

export const leftIcon = () => (
  <>
    <Input
      label="login"
      placeholder="로그인 하세요"
      leftIcon={
        <div className="rounded-full bg-pink-500 w-4 h-4 -translate-y-[2px]"></div>
      }
    />
  </>
);

export const rightIcon = () => (
  <>
    <Input
      label="login"
      placeholder="로그인 하세요"
      rightIcon={
        <div className="rounded-full bg-pink-500 w-4 h-4 -translate-y-[2px]"></div>
      }
    />
  </>
);
export const iconOnBothSides = () => (
  <>
    <Input
      label="login"
      placeholder="로그인 하세요"
      leftIcon={
        <div className="rounded-full bg-pink-500 w-4 h-4 -translate-y-[2px]"></div>
      }
      rightIcon={
        <div className="rounded-full bg-pink-500 w-4 h-4 -translate-y-[2px]"></div>
      }
    />
  </>
);

export const radius = () => (
  <>
    <Input radius="none" />
    <Input radius="small" />
    <Input radius="medium" />
    <Input radius="large" />
    <Input radius="full" />
  </>
);

const dummyError: FieldError = {
  type: "manual",
  message: "다시 입력하세요",
};

export const error = () => (
  <>
    <Input
      isError={dummyError}
      label="login"
      errorMessage="다시 입력하세요"
      placeholder="login"
      className="w-60"
    />
  </>
);

export const full = () => (
  <>
    <Input full={true} />
  </>
);
