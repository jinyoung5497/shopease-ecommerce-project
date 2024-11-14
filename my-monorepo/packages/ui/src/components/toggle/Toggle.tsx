import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import React from "react";
import { ToggleProps } from "./ToggleType";
import { sizeClass, radiusClass } from "./ToggleClass";

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
    ref,
  ) => {
    const Component = asChild ? Slot : "button"; // asChild를 사용해 요소를 변경할 수 있음

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
  },
);
