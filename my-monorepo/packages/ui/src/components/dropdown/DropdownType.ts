import { ReactNode, createContext } from "react";

export const DropdownContext = createContext<{
  value: string | undefined;
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownValue: string;
  setDropdownValue: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export type RootProps = {
  children: ReactNode;
  value?: string;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
  controlledOpen?: boolean;
  setControlledOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DropdownTriggerType = {
  children: ReactNode;
  asChild?: boolean;
};

export type DropdownMenuProps = {
  children: ReactNode;
};

export type DropdownMenuTitleProps = {
  title: string;
};

export type DropdownMenuItemProps = {
  children: ReactNode;
  asChild?: boolean;
  value: string;
};
