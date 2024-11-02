import React from "react";
import { ButtonSize, ButtonVariant, ButtonColor, ButtonRadius } from "./Button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
}
