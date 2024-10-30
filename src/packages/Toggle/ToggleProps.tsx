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
