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
