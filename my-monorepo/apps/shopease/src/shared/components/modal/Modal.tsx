import { createContext, useContext, useRef, useState } from "react";
import { Button } from "../button/Button";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { useDisableScroll } from "@/shared/hooks/useDisableScroll";

import { ReactNode } from "react";
import { ButtonProps } from "../button/ButtonClassType";
import { useCustomContext } from "@/shared/hooks/useCustomContext";

export type RootProps = {
  children: ReactNode;
};
export type ModalTriggerProps = {
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
export type ModalCloseButtonProps = {
  topRight?: boolean;
  topLeft?: boolean;
  bottomRight?: boolean;
  bottomLeft?: boolean;
  children: ReactNode;
};

interface ModalContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalRoot = ({ children }: RootProps) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        label,
        setLabel,
      }}
    >
      <div>{children}</div>
    </ModalContext.Provider>
  );
};

export const ModalTrigger = ({ rightIcon, ...rest }: ModalTriggerProps) => {
  const context = useCustomContext(ModalContext);
  return (
    <Button
      onClick={(event) => {
        context?.setOpen(true);
        event.preventDefault();
      }}
      className="flex items-center justify-center"
      {...rest}
    >
      {context?.label ? context?.label : rest.children}
      {rightIcon && rightIcon}
    </Button>
  );
};

export const ModalContent = ({ children }: ModalContentProps) => {
  const ModalContentRef = useRef<HTMLDivElement>(null);
  const context = useContext(ModalContext);

  if (context) {
    useOutsideClick(ModalContentRef, context?.open, () =>
      context?.setOpen(false)
    );
    useDisableScroll(context?.open);
  }

  if (!context?.open) return null;
  return (
    <div className="bg-black bg-opacity-50 w-full h-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
      <div
        className="w-[550px] rounded-[7px] flex flex-col items-start drop-shadow-lg bg-white p-5 gap-1 mt-1 relative"
        ref={ModalContentRef}
      >
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ children }: ModalHeaderProps) => {
  return <div className="flex flex-col gap-2 w-full">{children}</div>;
};

export const ModalClose = ({
  topRight,
  topLeft,
  bottomRight,
  bottomLeft,
  children,
}: ModalCloseButtonProps) => {
  const context = useContext(ModalContext);

  const closeClass = [
    topRight && "absolute right-7",
    topLeft && "absolute left-7",
    bottomRight && "absolute bottom-2 right-7",
    bottomLeft && "absolute bottom-2 right-7",
  ].join(" ");

  return (
    <button onClick={() => context?.setOpen(false)} className={closeClass}>
      {children}
    </button>
  );
};

export const ModalDivider = () => {
  return <div className="mt-1 w-full border-slate-200 border-b-[1px]"></div>;
};

export const ModalTitle = ({ title }: ModalTitleProps) => {
  return <div className="font-semibold w-full text-2xl">{title}</div>;
};

export const ModalDescription = ({ description }: ModalDescriptionProps) => {
  return <div className="w-full">{description}</div>;
};

export const ModalItems = ({ children }: ModalItemsProps) => {
  return <div className="flex flex-col w-full gap-2 my-3">{children}</div>;
};

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className="w-full">{children}</div>;
};

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Header: ModalHeader,
  Close: ModalClose,
  Divider: ModalDivider,
  Title: ModalTitle,
  Description: ModalDescription,
  Content: ModalContent,
  Items: ModalItems,
  Footer: ModalFooter,
};
