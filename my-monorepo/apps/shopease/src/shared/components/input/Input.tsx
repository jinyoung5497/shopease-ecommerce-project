import React from "react";
import { FieldError } from "react-hook-form";

export type InputRadius = "none" | "small" | "medium" | "large" | "full";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  full?: boolean;
  radius?: InputRadius;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isError?: FieldError;
  errorMessage?: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLElement, InputProps>(
  (
    {
      label,
      full = false,
      radius = "small",
      leftIcon,
      rightIcon,
      isError = false,
      errorMessage,
      className,
      ...rest
    },
    ref
  ) => {
    const Component = "input";

    const radiusClass = {
      none: "rounded-none",
      small: "rounded-[5px]",
      medium: "rounded-[7px]",
      large: "rounded-[10px]",
      full: "rounded-full",
    }[radius];

    const classes = [
      radiusClass,
      className,
      !isError ? "border-primary" : "border-red-600",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`flex flex-col gap-1 text-primary ${full && "w-full"}`}>
        <div className="text-[15px]">{label}</div>
        <div className="relative">
          <Component
            ref={ref as React.LegacyRef<HTMLInputElement>}
            className={`${classes} ${full && "w-full"}
          flex items-center justify-center gap-1 px-3 py-[10px] border-[1px] border-primary font-medium focus:outline-2 focus:outline-neutral-800 outline-none ${
            leftIcon && "pl-10"
          } ${rightIcon && "pr-10"}`}
            {...rest}
          />
          <div className="absolute top-1/2 left-2 transform -translate-y-3 w-7 h-7 flex items-center justify-center">
            {leftIcon}
          </div>
          <div className="absolute top-1/2 right-2 transform -translate-y-3 w-7 h-7 flex items-center justify-center">
            {rightIcon}
          </div>
        </div>
        {isError && <div className="text-sm text-red-600">{errorMessage}</div>}
      </div>
    );
  }
);
