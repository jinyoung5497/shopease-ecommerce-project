import { ReactNode, createContext, useRef, useState } from "react";
import { Button } from "../button/Button";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { useDisableScroll } from "@/shared/hooks/useDisableScroll";
import { ButtonProps } from "@/shared/components/button/ButtonClassType";
import styles from "./Sheet.module.css";
import { useSheetAnimation } from "@/shared/hooks/useSheetAnimation";
import { useCustomContext } from "@/shared/hooks/useCustomContext";

export type RootProps = {
  children: ReactNode;
};
export type SheetTriggerType = {} & ButtonProps;
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

const SheetContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const SheetRoot = ({ children }: RootProps) => {
  const [open, setOpen] = useState(false);

  return (
    <SheetContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      <div>{children}</div>
    </SheetContext.Provider>
  );
};

export const SheetTrigger = ({ ...rest }: SheetTriggerType) => {
  const context = useCustomContext(SheetContext);
  return (
    <Button
      onClick={() => {
        context?.setOpen((prev) => !prev);
      }}
      className="w-fit flex items-center justify-center"
      {...rest}
    >
      {rest.children}
    </Button>
  );
};

export const SheetContent = ({ children }: SheetContentProps) => {
  const SheetContentRef = useRef<HTMLDivElement>(null);
  const context = useCustomContext(SheetContext);
  const shouldRender = useSheetAnimation(context?.open);

  if (context) {
    useOutsideClick(SheetContentRef, context?.open, () =>
      context?.setOpen(false)
    );
    useDisableScroll(context?.open);
  }

  if (!shouldRender) return null;

  return (
    <div
      className={`z-10 w-[400px] h-full rounded-l-[7px] flex flex-col items-start justify-center drop-shadow-lg bg-white p-5 gap-1 absolute top-0 right-0 ${
        context?.open ? styles["slide-in"] : styles["slide-out"]
      }`}
      ref={SheetContentRef}
    >
      {children}
    </div>
  );
};

export const SheetHeader = ({ children }: SheetHeaderProps) => {
  return <div className="flex flex-col gap-2 w-full">{children}</div>;
};

export const SheetClose = ({
  topRight,
  topLeft,
  bottomRight,
  bottomLeft,
  children,
}: SheetCloseProps) => {
  const context = useCustomContext(SheetContext);

  const closeClass = [
    topRight && "absolute top-4 right-7",
    topLeft && "absolute top-4 left-7",
    bottomRight && "absolute bottom-2 right-7",
    bottomLeft && "absolute bottom-2 right-7",
  ].join(" ");

  return (
    <button onClick={() => context?.setOpen(false)} className={closeClass}>
      {children}
    </button>
  );
};

export const SheetDivider = () => {
  return <div className="mt-1 w-full border-slate-200 border-b-[1px]"></div>;
};

export const SheetTitle = ({ title }: SheetTitleProps) => {
  return <div className="font-semibold w-full text-xl">{title}</div>;
};

export const SheetDescription = ({ description }: SheetDescriptionProps) => {
  return <div className="w-full">{description}</div>;
};

export const SheetItems = ({ children }: SheetItemsProps) => {
  return (
    <div className="flex flex-col w-full gap-2 my-3 flex-grow overflow-y-scroll">
      {children}
    </div>
  );
};

export const SheetFooter = ({ children }: SheetFooterProps) => {
  return <div className="w-full px-5 pb-2">{children}</div>;
};

export const Sheet = {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Header: SheetHeader,
  Close: SheetClose,
  Divider: SheetDivider,
  Title: SheetTitle,
  Description: SheetDescription,
  Content: SheetContent,
  Items: SheetItems,
  Footer: SheetFooter,
};
