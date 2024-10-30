import React from "react";
import { ToggleProps } from "./ToggleProps";

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

    // 각 스타일 옵션을 클래스명으로 매핑하여 확장성과 유지보수성을 높임
    const sizeClass = {
      xsmall: "px-[7px] py-[1px] text-[12px]",
      small: "px-[10px] py-[3px] text-[14px]",
      medium: "px-[12px] py-[5px] text-[16px]",
      large: "px-[14px] py-[7px] text-[16px]",
      xlarge: "px-[16px] py-[7px] text-[18px]",
    }[size];

    const variantStyles = {
      outline: {
        variantClass: "text-black border border-solid",
        colorClass: {
          primary: `text-primary border-primary hover:bg-primary hover:text-white ${
            isActive && "bg-primary text-white"
          }`,
          blue: `text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white ${
            isActive && "bg-blue-600 text-white"
          }`,
          black: `text-black border-black hover:bg-black hover:text-white ${
            isActive && "bg-black text-white"
          }`,
          red: `text-red-600 border-red-600 hover:bg-red-600 hover:text-white ${
            isActive && "bg-red-600 text-white"
          }`,
        }[color],
      },
      ghost: {
        variantClass: "",
        colorClass: {
          primary: `text-primary hover:bg-primary hover:text-white ${
            isActive && "bg-primary text-white"
          }`,
          blue: `text-blue-600 hover:bg-blue-600 hover:text-white ${
            isActive && "bg-blue-600 text-white"
          }`,
          black: `text-black hover:bg-black hover:text-white ${
            isActive && "bg-black text-white"
          }`,
          red: `text-red-600 hover:bg-red-600 hover:text-white ${
            isActive && "bg-red-600 text-white"
          }`,
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
      "flex items-center justify-center gap-2",
      sizeClass,
      variantClass,
      colorClass,
      radiusClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component
        ref={ref as React.LegacyRef<HTMLButtonElement>}
        className={`${classes} `}
        onClick={rest.onClick}
        {...rest}
      >
        {icon && <span className="mr-2">{icon}</span>}{" "}
        {/* 아이콘이 있으면 표시 */}
        {children}
      </Component>
    );
  }
);
