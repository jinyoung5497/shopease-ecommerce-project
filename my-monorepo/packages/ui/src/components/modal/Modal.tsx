import { useContext, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDisableScroll } from "../../hooks/useDisableScroll";
import { useCustomContext } from "../../hooks/useCustomContext";
import {
  RootProps,
  ModalTriggerProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalCloseButtonProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalItemsProps,
  ModalFooterProps,
  ModalContext,
} from "./ModalType";
import { Slot } from "@radix-ui/react-slot";

export const ModalRoot = ({
  children,
  controlledOpen,
  setControlledOpen,
}: RootProps) => {
  const [open, setOpen] = useState(false);
  const isModalOpen = controlledOpen !== undefined ? controlledOpen : open;
  const setIsModalOpen =
    setControlledOpen !== undefined ? setControlledOpen : setOpen;

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
      }}
    >
      <div>{children}</div>
    </ModalContext.Provider>
  );
};

export const ModalTrigger = ({ children, asChild }: ModalTriggerProps) => {
  const context = useCustomContext(ModalContext);
  const Component = asChild ? Slot : "button";
  return (
    <Component
      onClick={(event) => {
        event.preventDefault();
        context.setIsModalOpen(true);
      }}
    >
      {children}
    </Component>
  );
};

export const ModalContent = ({ children }: ModalContentProps) => {
  const ModalContentRef = useRef<HTMLDivElement>(null);
  const context = useContext(ModalContext);

  if (context) {
    useOutsideClick(ModalContentRef, context?.isModalOpen, () =>
      context?.setIsModalOpen(false),
    );
    useDisableScroll(context?.isModalOpen);
  }

  if (!context?.isModalOpen) return null;
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
    <button
      onClick={() => context?.setIsModalOpen(false)}
      className={closeClass}
    >
      {children}
    </button>
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
