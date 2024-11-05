import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/shared/components/input/Input";
import { InputProps } from "@/shared/components/input/Input";
import { FieldError } from "react-hook-form";
import { ChevronDown, LogIn } from "lucide-react";

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
      className="translate-y-[2px]"
      leftIcon={<LogIn />}
    />
  </>
);

export const rightIcon = () => (
  <>
    <Input
      label="login"
      placeholder="로그인 하세요"
      className="translate-y-[2px]"
      rightIcon={<LogIn />}
    />
  </>
);
export const iconOnBothSides = () => (
  <>
    <Input
      label="login"
      placeholder="로그인 하세요"
      className="translate-y-[2px]"
      leftIcon={<LogIn />}
      rightIcon={<ChevronDown />}
    />
  </>
);

export const radius = () => (
  <>
    <Input placeholder="none" radius="none" />
    <Input placeholder="small" radius="small" />
    <Input placeholder="medium" radius="medium" />
    <Input placeholder="large" radius="large" />
    <Input placeholder="full" radius="full" />
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
    <Input full={true} placeholder="full" label="Full" />
  </>
);
