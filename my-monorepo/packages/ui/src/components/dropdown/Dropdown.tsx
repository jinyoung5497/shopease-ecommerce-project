import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { useCustomContext } from "../../hooks/useCustomContext";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

const DropdownContext = createContext<{
  value: string | undefined;
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownValue: string;
  setDropdownValue: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

type RootProps = {
  children: ReactNode;
  value?: string;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
  controlledOpen?: boolean;
  setControlledOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DropdownRoot = ({
  children,
  value,
  onValueChange,
  controlledOpen,
  setControlledOpen,
}: RootProps) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const dropdownOpen = controlledOpen ? controlledOpen : open;
  const setDropdownOpen = setControlledOpen ? setControlledOpen : setOpen;
  const dropdownValue = value ? value : label;
  const setDropdownValue = onValueChange ? onValueChange : setLabel;

  return (
    <DropdownContext.Provider
      value={{
        value,
        dropdownOpen,
        setDropdownOpen,
        dropdownValue,
        setDropdownValue,
      }}
    >
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};

type DropdownTriggerType = {
  children: ReactNode;
  asChild?: boolean;
};
export const DropdownTrigger = ({ children, asChild }: DropdownTriggerType) => {
  const context = useCustomContext(DropdownContext);
  const Component = asChild ? Slot : "button";

  const modifiedChildren = React.isValidElement(children)
    ? React.cloneElement(
        children,
        {},
        context.dropdownValue || children.props.children,
      )
    : context.dropdownValue || children;

  return (
    <Component
      onClick={(event) => {
        event.preventDefault();
        context?.setDropdownOpen((prev) => !prev);
      }}
    >
      {modifiedChildren}
    </Component>
  );
};

type DropdownMenuProps = {
  children: ReactNode;
};

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const context = useCustomContext(DropdownContext);

  useEffect(() => {
    if (context?.dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [context?.dropdownOpen]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(e.target as Node)
    ) {
      context?.setDropdownOpen(false);
    }
  };

  if (!context?.dropdownOpen) return null;
  return (
    <div
      className="w-max min-w-48 rounded-[7px] flex flex-col items-start absolute top-10 drop-shadow-lg bg-white p-1 gap-1 max-h-44 overflow-y-auto mt-1 z-20"
      ref={dropdownMenuRef}
    >
      {children}
    </div>
  );
};

type DropdownMenuTitleProps = {
  title: string;
};
export const DropdownMenuTitle = ({ title }: DropdownMenuTitleProps) => {
  return (
    <div className="mb-1 border-slate-200 border-b-[1px] font-semibold p-1 w-full">
      {title}
    </div>
  );
};

type DropdownMenuItemProps = {
  children: ReactNode;
  asChild?: boolean;
  value: string;
};
export const DropdownMenuItem = ({
  children,
  asChild,
  value,
}: DropdownMenuItemProps) => {
  const context = useCustomContext(DropdownContext);
  const Component = asChild ? Slot : "button";
  return (
    <Component
      onClick={() => {
        context?.setDropdownValue(value);
        context?.setDropdownOpen(false);
      }}
      className="hover:bg-slate-100 rounded-[7px] min-h-8 text-sm w-full text-start px-2 flex items-center justify-start gap-1"
    >
      {children}
    </Component>
  );
};

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Title: DropdownMenuTitle,
  Menu: DropdownMenu,
  MenuItem: DropdownMenuItem,
};
