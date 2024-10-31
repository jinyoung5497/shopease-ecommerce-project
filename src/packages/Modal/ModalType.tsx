import { ReactNode } from "react";
import { ButtonProps } from "../button/ButtonProps";

export type RootProps = {
  children: ReactNode;
};
export type ModalTriggerType = {
  rightIcon?: ReactNode;
} & ButtonProps;
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
