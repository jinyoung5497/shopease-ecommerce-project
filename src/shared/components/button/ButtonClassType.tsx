import React, { ComponentPropsWithoutRef, ElementRef } from "react";
import { cva } from "class-variance-authority";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  radius?: ButtonRadius;
  icon?: React.ReactNode;
  loading?: boolean;
  full?: boolean;
  className?: string;
  children: React.ReactNode;
  between?: boolean;
};
export type Ref = ElementRef<"button">;

export type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonColor = "primary" | "blue" | "black" | "red";
export type ButtonRadius = "none" | "small" | "medium" | "large" | "full";

// 각 스타일 옵션을 클래스명으로 매핑하여 확장성과 유지보수성을 높임
export const sizeClass = {
  xsmall: "px-[7px] py-[1px] text-[12px]",
  small: "px-[10px] py-[3px] text-[14px]",
  medium: "px-[12px] py-[5px] text-[16px]",
  large: "px-[14px] py-[7px] text-[16px]",
  xlarge: "px-[16px] py-[7px] text-[18px]",
};

export const radiusClass = {
  none: "rounded-none",
  small: "rounded-[5px]",
  medium: "rounded-[8px]",
  large: "rounded-[12px]",
  full: "rounded-full",
};

export const buttonVariants = cva("", {
  variants: {
    variant: {
      solid: "text-white",
      outline: "border border-solid",
      ghost: "",
      link: "",
    },
    color: {
      primary: "",
      blue: "",
      black: "",
      red: "",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "primary",
      className: "bg-primary hover:bg-blue-900",
    },
    {
      variant: "outline",
      color: "primary",
      className:
        "text-primary border-primary hover:bg-primary hover:text-white",
    },
    {
      variant: "ghost",
      color: "primary",
      className: "text-primary hover:bg-primary hover:text-white",
    },
    {
      variant: "link",
      color: "primary",
      className: "text-primary hover:text-blue-800",
    },
    {
      variant: "solid",
      color: "blue",
      className: "bg-blue-600 hover:bg-blue-500 text-white",
    },
    {
      variant: "outline",
      color: "blue",
      className:
        "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      variant: "ghost",
      color: "blue",
      className: "text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      variant: "link",
      color: "blue",
      className: "text-blue-600 hover:text-blue-400",
    },
    {
      variant: "solid",
      color: "black",
      className: "bg-black hover:bg-zinc-700 text-white",
    },
    {
      variant: "outline",
      color: "black",
      className: "text-black border-black hover:bg-black hover:text-white",
    },
    {
      variant: "ghost",
      color: "black",
      className: "text-black hover:bg-black hover:text-white",
    },
    {
      variant: "link",
      color: "black",
      className: "text-black hover:text-zinc-600",
    },
    {
      variant: "solid",
      color: "red",
      className: "bg-red-600 hover:bg-red-500 text-white",
    },
    {
      variant: "outline",
      color: "red",
      className:
        "text-red-600 border-red-600 hover:bg-red-600 hover:text-white",
    },
    {
      variant: "ghost",
      color: "red",
      className: "text-red-600 hover:bg-red-600 hover:text-white",
    },
    {
      variant: "link",
      color: "red",
      className: "text-red-600 hover:text-red-400",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
  },
});
