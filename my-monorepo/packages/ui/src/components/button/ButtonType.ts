import React, { ComponentPropsWithoutRef, ElementRef } from "react";
import {
  ButtonSize,
  ButtonVariant,
  ButtonColor,
  ButtonRadius,
} from "./ButtonClass";

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
