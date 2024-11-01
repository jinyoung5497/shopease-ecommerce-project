import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "../packages/Toggle/Toggle";
import { ToggleProps } from "@/packages/Toggle/ToggleProps";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  tags: ["autodocs"],
  component: Toggle,
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
type Story = StoryObj<ToggleProps>;

export const Basic: Story = {
  args: {
    children: "Basic",
  },
};

export const size = () => (
  <>
    <Toggle size="xsmall">xsmall</Toggle>
    <Toggle size="small">small</Toggle>
    <Toggle size="medium">medium</Toggle>
    <Toggle size="large">large</Toggle>
    <Toggle size="xlarge">xlarge</Toggle>
  </>
);

export const variant = () => (
  <>
    <Toggle variant="outline">outline</Toggle>
    <Toggle variant="ghost">ghost</Toggle>
  </>
);

export const color = () => (
  <>
    <Toggle color="primary">primary</Toggle>
    <Toggle color="red">red</Toggle>
    <Toggle color="blue">blue</Toggle>
    <Toggle color="black">black</Toggle>
  </>
);

export const radius = () => (
  <>
    <Toggle radius="none">none</Toggle>
    <Toggle radius="small">small</Toggle>
    <Toggle radius="medium">medium</Toggle>
    <Toggle radius="large">large</Toggle>
    <Toggle radius="full">full</Toggle>
  </>
);
