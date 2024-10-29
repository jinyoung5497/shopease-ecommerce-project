import React from "react";
import { ButtonProps } from "./ButtonProps";

export type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonColor = "primary" | "blue" | "black" | "red";
export type ButtonRadius = "none" | "small" | "medium" | "large" | "full";

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      asChild = false,
      size = "medium",
      variant = "solid",
      color = "primary",
      radius = "small",
      icon,
      loading = false,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const Component = asChild ? "span" : "button"; // asChild를 사용해 요소를 변경할 수 있음

    // 각 스타일 옵션을 클래스명으로 매핑하여 확장성과 유지보수성을 높임
    const sizeClass = {
      xsmall: "px-[7px] py-[3px] text-[10px]",
      small: "px-[10px] py-[5px] text-[12px]",
      medium: "px-[12px] py-[7px] text-[14px]",
      large: "px-[14px] py-[9px] text-[16px]",
      xlarge: "px-[16px] py-[12px] text-[18px]",
    }[size];

    const variantStyles = {
      solid: {
        variantClass: "text-white",
        colorClass: {
          primary: "bg-primary hover:bg-blue-900",
          blue: "bg-blue-600 hover:bg-blue-500",
          black: "bg-black hover:bg-zinc-700",
          red: "bg-red-600 hover:bg-red-500",
        }[color],
      },
      outline: {
        variantClass: "text-black border border-solid",
        colorClass: {
          primary:
            "text-primary border-primary hover:bg-primary hover:text-white",
          blue: "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white",
          black: "text-black border-black hover:bg-black hover:text-white",
          red: "text-red-600 border-red-600 hover:bg-red-600 hover:text-white",
        }[color],
      },
      ghost: {
        variantClass: "",
        colorClass: {
          primary: "text-primary hover:bg-primary hover:text-white",
          blue: "text-blue-600 hover:bg-blue-600 hover:text-white",
          black: "text-black hover:bg-black hover:text-white",
          red: "text-red-600 hover:bg-red-600 hover:text-white",
        }[color],
      },
      link: {
        variantClass: ``,
        colorClass: {
          primary: "text-primary hover:text-blue-800",
          blue: "text-blue-600 hover:text-blue-400",
          black: "text-black hover:text-zinc-600",
          red: "text-red-600 hover:text-red-400",
        }[color],
      },
    };

    // 선택된 변형의 스타일 가져오기
    const { variantClass, colorClass } = variantStyles[variant];

    const radiusClass = {
      none: "rounded-none",
      small: "rounded-[5px]",
      medium: "rounded-[8px]",
      large: "rounded-[12px]",
      full: "rounded-full",
    }[radius];

    // 클래스 문자열을 결합하여 가독성 향상
    const classes = [
      "flex items-center justify-center",
      sizeClass,
      variantClass,
      colorClass,
      radiusClass,
      className,
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
          <>
            {icon && <span className="mr-2">{icon}</span>}{" "}
            {/* 아이콘이 있으면 표시 */}
            {children}
          </>
        )}
      </Component>
    );
  }
);

export default Button;
