import { cva } from "class-variance-authority";
import React from "react";

export type ToggleSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type ToggleVariant = "outline" | "ghost";
export type ToggleColor = "primary" | "blue" | "black" | "red";
export type ToggleRadius = "none" | "small" | "medium" | "large" | "full";

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: ToggleSize;
  variant?: ToggleVariant;
  color?: ToggleColor;
  radius?: ToggleRadius;
  icon?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}

const sizeClass = {
  xsmall: "px-[7px] py-[1px] text-[12px]",
  small: "px-[10px] py-[3px] text-[14px]",
  medium: "px-[12px] py-[5px] text-[16px]",
  large: "px-[14px] py-[7px] text-[16px]",
  xlarge: "px-[16px] py-[7px] text-[18px]",
};

const radiusClass = {
  none: "rounded-none",
  small: "rounded-[5px]",
  medium: "rounded-[8px]",
  large: "rounded-[12px]",
  full: "rounded-full",
};

export const Toggle = React.forwardRef<HTMLElement, ToggleProps>(
  (
    {
      asChild = false,
      size = "large",
      variant = "outline",
      color = "primary",
      radius = "small",
      icon,
      isActive = false,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const Component = asChild ? "span" : "button"; // asChild를 사용해 요소를 변경할 수 있음

    const toggleVariants = cva("", {
      variants: {
        variant: {
          outline: "border border-solid",
          ghost: "",
        },
        color: {
          primary: "text-primary hover:bg-primary hover:text-white",
          blue: "",
          black: "",
          red: "",
        },
      },
      compoundVariants: [
        {
          variant: "outline",
          color: "primary",
          className: `text-primary border-primary hover:bg-primary hover:text-white ${
            isActive && "bg-primary text-white"
          }`,
        },
        {
          variant: "outline",
          color: "blue",
          className: `text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white ${
            isActive && "bg-blue-600 text-white"
          }`,
        },
        {
          variant: "outline",
          color: "black",
          className: `text-black border-black hover:bg-black hover:text-white ${
            isActive && "bg-black text-white"
          }`,
        },
        {
          variant: "outline",
          color: "red",
          className: `text-red-600 border-red-600  hover:bg-red-600 hover:text-white ${
            isActive && "bg-red-600 text-white"
          }`,
        },
        {
          variant: "ghost",
          color: "primary",
          className: `text-primary hover:bg-primary hover:text-white ${
            isActive && "bg-primary text-white"
          }`,
        },
        {
          variant: "ghost",
          color: "blue",
          className: `text-blue-600 hover:bg-blue-600 hover:text-white ${
            isActive && "bg-blue-600 text-white"
          }`,
        },
        {
          variant: "ghost",
          color: "black",
          className: `text-black hover:bg-black hover:text-white ${
            isActive && "bg-black text-white"
          }`,
        },
        {
          variant: "ghost",
          color: "red",
          className: `text-red-600 hover:bg-red-600 hover:text-white ${
            isActive && "bg-red-600 text-white"
          }`,
        },
      ],
    });

    // 클래스 문자열을 결합하여 가독성 향상
    const classes = [
      "flex items-center justify-center gap-2",
      sizeClass[size],
      radiusClass[radius],
      toggleVariants({ variant, color }),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component
        ref={ref as React.LegacyRef<HTMLButtonElement>}
        className={classes}
        onClick={rest.onClick}
        {...rest}
      >
        {icon && <span className="mr-2">{icon}</span>} {children}
      </Component>
    );
  }
);
