import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Button } from "../button/Button";
import {
  RootProps,
  ModalTriggerType,
  ModalContentProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalItemsProps,
  ModalFooterProps,
} from "./ModalType";

const ModalContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

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

export const ModalTrigger = ({ rightIcon, ...rest }: ModalTriggerType) => {
  const context = useContext(ModalContext);
  return (
    <Button
      onClick={(event) => {
        context?.setOpen((prev) => !prev);
        event.preventDefault();
      }}
      className="min-w-24 flex items-center justify-between"
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

  useEffect(() => {
    if (context?.open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [context?.open]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      ModalContentRef.current &&
      !ModalContentRef.current.contains(e.target as Node)
    ) {
      context?.setOpen(false);
    }
  };

  if (!context?.open) return null;
  return (
    <div className="bg-black bg-opacity-50 w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
      <div
        className="min-w-[500px] w-max rounded-[7px] flex flex-col items-start drop-shadow-lg bg-white p-5 gap-1 mt-1 relative"
        ref={ModalContentRef}
      >
        {children}
        <button
          onClick={() => context.setOpen(false)}
          className="absolute right-7"
        >
          <i className="fi fi-rs-cross-small"></i>
          <div>x</div>
        </button>
      </div>
    </div>
  );
};

export const ModalHeader = ({ children }: ModalHeaderProps) => {
  return <div className="flex flex-col gap-2 w-full">{children}</div>;
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
  return (
    <div className="flex flex-col w-full items-start justify-center gap-2 my-3">
      {children}
    </div>
  );
};

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className="w-full">{children}</div>;
};

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Header: ModalHeader,
  Divider: ModalDivider,
  Title: ModalTitle,
  Description: ModalDescription,
  Content: ModalContent,
  Items: ModalItems,
  Footer: ModalFooter,
};
