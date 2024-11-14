import { useRef, useState } from "react";
import { useCustomContext } from "../../hooks/useCustomContext";
import { Slot } from "@radix-ui/react-slot";
import React from "react";
import {
  RootProps,
  DropdownContext,
  DropdownTriggerType,
  DropdownMenuProps,
  DropdownMenuTitleProps,
  DropdownMenuItemProps,
} from "./DropdownType";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDisableScroll } from "../..//hooks/useDisableScroll";

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

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const context = useCustomContext(DropdownContext);

  useOutsideClick(dropdownMenuRef, context?.dropdownOpen, () =>
    context?.setDropdownOpen(false),
  );
  useDisableScroll(context?.dropdownOpen);

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

export const DropdownMenuTitle = ({ title }: DropdownMenuTitleProps) => {
  return (
    <div className="mb-1 border-slate-200 border-b-[1px] font-semibold p-1 w-full">
      {title}
    </div>
  );
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
