import { ReactNode, createContext } from "react";

export type RootProps = {
  children: ReactNode;
  controlledOpen?: boolean;
  setControlledOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
export type ModalTriggerProps = {
  children: ReactNode;
  asChild?: boolean;
};
export type ModalContentProps = {
  children: ReactNode;
};
export type ModalHeaderProps = {
  children: ReactNode;
};
export type ModalTitleProps = {
  title: string;
};
export type ModalDescriptionProps = {
  description: string;
};
export type ModalItemsProps = {
  children: ReactNode;
};
export type ModalFooterProps = {
  children: ReactNode;
};
export type ModalCloseButtonProps = {
  topRight?: boolean;
  topLeft?: boolean;
  bottomRight?: boolean;
  bottomLeft?: boolean;
  children: ReactNode;
};

export interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextType | null>(null);
