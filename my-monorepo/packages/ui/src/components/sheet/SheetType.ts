import { ReactNode, createContext } from "react";

export type RootProps = {
  children: ReactNode;
};
export type SheetTriggerType = {
  children: ReactNode;
  asChild?: boolean;
};
export type SheetContentProps = {
  children: ReactNode;
};
export type SheetHeaderProps = {
  children: ReactNode;
};
export type SheetTitleProps = {
  title: string;
};
export type SheetDescriptionProps = {
  description: string;
};
export type SheetItemsProps = {
  children: ReactNode;
};
export type SheetFooterProps = {
  children: ReactNode;
};
export type SheetCloseProps = {
  topRight?: boolean;
  topLeft?: boolean;
  bottomRight?: boolean;
  bottomLeft?: boolean;
  children: ReactNode;
};

export const SheetContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);
