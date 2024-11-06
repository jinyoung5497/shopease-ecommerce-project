import React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Ref,
  ButtonProps,
  sizeClass,
  buttonVariants,
  radiusClass,
} from "./ButtonClassType";

export const Button = React.forwardRef<Ref, ButtonProps>(
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
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button"; // asChild를 사용해 요소를 변경할 수 있음

    // 클래스 문자열을 결합하여 가독성 향상
    const classes = [
      sizeClass[size],
      buttonVariants({ variant, color }),
      radiusClass[radius],
      className,
      full && "w-full",
      loading && "opacity-50 cursor-not-allowed",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component
        ref={ref}
        className={classes}
        onClick={!loading ? props.onClick : undefined}
        {...props}
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
