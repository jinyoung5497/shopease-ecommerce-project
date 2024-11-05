import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { ButtonProps } from "@/shared/components/button/ButtonClassType";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  tags: ["autodocs"],
  component: Button,
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
type Story = StoryObj<ButtonProps>;

export const Basic: Story = {
  args: {
    children: "Basic",
  },
};

export const size = () => (
  <>
    <Button size="xsmall">xsmall</Button>
    <Button size="small">small</Button>
    <Button size="medium">medium</Button>
    <Button size="large">large</Button>
    <Button size="xlarge">xlarge</Button>
  </>
);

export const variant = () => (
  <>
    <Button variant="solid">solid</Button>
    <Button variant="outline">outline</Button>
    <Button variant="ghost">ghost</Button>
    <Button variant="link">link</Button>
  </>
);

export const color = () => (
  <>
    <Button color="primary">primary</Button>
    <Button color="red">red</Button>
    <Button color="blue">blue</Button>
    <Button color="black">black</Button>
  </>
);

export const radius = () => (
  <>
    <Button radius="none">none</Button>
    <Button radius="small">small</Button>
    <Button radius="medium">medium</Button>
    <Button radius="large">large</Button>
    <Button radius="full">full</Button>
  </>
);

export const full = () => (
  <>
    <Button full={true}>full</Button>
  </>
);

export const loading = () => (
  <>
    <Button loading={true}>button</Button>
  </>
);
