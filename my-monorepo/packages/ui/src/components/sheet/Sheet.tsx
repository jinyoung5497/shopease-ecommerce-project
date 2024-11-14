import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDisableScroll } from "../../hooks/useDisableScroll";
import styles from "./Sheet.module.css";
import { useSheetAnimation } from "../../hooks/useSheetAnimation";
import { useCustomContext } from "../../hooks/useCustomContext";
import { Slot } from "@radix-ui/react-slot";
import {
  RootProps,
  SheetContext,
  SheetTriggerType,
  SheetContentProps,
  SheetCloseProps,
  SheetHeaderProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetItemsProps,
  SheetFooterProps,
} from "./SheetType";

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

export const SheetTrigger = ({ children, asChild }: SheetTriggerType) => {
  const context = useCustomContext(SheetContext);
  const Component = asChild ? Slot : "button";
  return (
    <Component
      onClick={() => {
        context?.setOpen((prev) => !prev);
      }}
    >
      {children}
    </Component>
  );
};

export const SheetContent = ({ children }: SheetContentProps) => {
  const SheetContentRef = useRef<HTMLDivElement>(null);
  const context = useCustomContext(SheetContext);
  const shouldRender = useSheetAnimation(context?.open);

  if (context) {
    useOutsideClick(SheetContentRef, context?.open, () =>
      context?.setOpen(false),
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

export const SheetHeader = ({ children }: SheetHeaderProps) => {
  return <div className="flex flex-col gap-2 w-full">{children}</div>;
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
