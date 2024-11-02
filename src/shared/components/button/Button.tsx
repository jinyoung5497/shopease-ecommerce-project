import React from "react";
import { ButtonProps } from "./ButtonProps";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

export type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonColor = "primary" | "blue" | "black" | "red";
export type ButtonRadius = "none" | "small" | "medium" | "large" | "full";

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      asChild = false,
      size = "large",
      variant = "solid",
      color = "primary",
      radius = "small",
      icon,
      loading = false,
      full = false,
      children,
      className,
      between,
      ...rest
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button"; // asChild를 사용해 요소를 변경할 수 있음

    // 각 스타일 옵션을 클래스명으로 매핑하여 확장성과 유지보수성을 높임
    const sizeClass = {
      xsmall: "px-[7px] py-[1px] text-[12px]",
      small: "px-[10px] py-[3px] text-[14px]",
      medium: "px-[12px] py-[5px] text-[16px]",
      large: "px-[14px] py-[7px] text-[16px]",
      xlarge: "px-[16px] py-[7px] text-[18px]",
    }[size];

    const buttonVariants = cva("", {
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

    const radiusClass = {
      none: "rounded-none",
      small: "rounded-[5px]",
      medium: "rounded-[8px]",
      large: "rounded-[12px]",
      full: "rounded-full",
    }[radius];

    // 클래스 문자열을 결합하여 가독성 향상
    const classes = [
      sizeClass,
      // variantClass,
      // colorClass,
      buttonVariants({ variant, color }),
      radiusClass,
      className,
      full && "w-full",
      loading && "opacity-50 cursor-not-allowed",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component
        ref={ref as React.LegacyRef<HTMLButtonElement>}
        className={`${classes} `}
        onClick={!loading ? rest.onClick : undefined}
        {...rest}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500 border-solid"></div>
          </div>
        ) : (
          <div
            className={`flex items-center ${
              between ? "justify-between" : "justify-center"
            } gap-1`}
          >
            {icon && icon}
            {children}
          </div>
        )}
      </Component>
    );
  }
);
