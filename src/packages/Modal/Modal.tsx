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

  // context.open이 변경될 때마다 스크롤 비활성화/활성화 처리
  useEffect(() => {
    if (context?.open) {
      document.body.style.overflow = "hidden"; // 스크롤 비활성화
      document.body.style.paddingRight = "15px"; // 스크롤 바 너비만큼 오른쪽 패딩 추가
    } else {
      document.body.style.overflow = "auto"; // 스크롤 활성화
      document.body.style.paddingRight = "0"; // 패딩 복구
    }

    // 컴포넌트 언마운트 시 원래 상태로 복구
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [context?.open]);

  if (!context?.open) return null;
  return (
    <div className="bg-black bg-opacity-50 w-full h-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
      <div
        className="w-[550px] rounded-[7px] flex flex-col items-start drop-shadow-lg bg-white p-5 gap-1 mt-1 relative"
        ref={ModalContentRef}
      >
        {children}
        <button
          onClick={() => context?.setOpen(false)}
          className="absolute right-7"
        >
          <i className="fi fi-rs-cross-small"></i>
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
  return <div className="flex flex-col w-full gap-2 my-3">{children}</div>;
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
