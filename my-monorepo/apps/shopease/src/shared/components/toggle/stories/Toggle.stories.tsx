import type { Meta, StoryObj } from "@storybook/react";

import { Toggle, ToggleColor, ToggleRadius, ToggleSize } from "../Toggle";
import { ToggleProps } from "@/shared/components/toggle/Toggle";
import { useState } from "react";

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
  render: () => {
    const [isActive, setIsActive] = useState(false);

    return (
      <Toggle
        isActive={isActive}
        onClick={() => setIsActive((prev) => !prev)} // 클릭 시 상태 변경
      >
        Basic
      </Toggle>
    );
  },
};

export const size = () => {
  // 각 토글 버튼의 활성화 상태를 관리하기 위한 배열 상태
  const [activeStates, setActiveStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleActive = (index: number) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const sizes: ToggleSize[] = ["xsmall", "small", "medium", "large", "xlarge"];

  return (
    <>
      {sizes.map((size, index) => (
        <Toggle
          key={size} // 각 토글에 고유한 키를 부여
          isActive={activeStates[index]} // 각 상태를 매핑하여 전달
          onClick={() => toggleActive(index)} // 클릭 시 상태 토글
          size={size} // 현재 크기를 매핑하여 전달
        >
          {size}
        </Toggle>
      ))}
    </>
  );
};

export const variant = () => {
  const [activeStates, setActiveStates] = useState([false, false]);

  const toggleActive = (index: number) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <>
      <Toggle
        isActive={activeStates[0]}
        onClick={() => toggleActive(0)}
        variant="outline"
      >
        outline
      </Toggle>
      <Toggle
        isActive={activeStates[1]}
        onClick={() => toggleActive(1)}
        variant="ghost"
      >
        ghost
      </Toggle>
    </>
  );
};

export const color = () => {
  const [activeStates, setActiveStates] = useState([
    false,
    false,
    false,
    false,
  ]);

  const toggleActive = (index: number) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const colors: ToggleColor[] = ["primary", "red", "blue", "black"];

  return (
    <>
      {colors.map((color, index) => (
        <Toggle
          key={color}
          isActive={activeStates[index]}
          onClick={() => toggleActive(index)}
          color={color}
        >
          {color}
        </Toggle>
      ))}
    </>
  );
};

export const radius = () => {
  const [activeStates, setActiveStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleActive = (index: number) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const radii: ToggleRadius[] = ["none", "small", "medium", "large", "full"];

  return (
    <>
      {radii.map((radius, index) => (
        <Toggle
          key={radius}
          isActive={activeStates[index]}
          onClick={() => toggleActive(index)}
          radius={radius}
        >
          {radius}
        </Toggle>
      ))}
    </>
  );
};
