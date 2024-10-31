import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../button/Button";
import { ButtonProps } from "../button/ButtonProps";

const DropdownContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

type RootProps = {
  children: ReactNode;
};
export const DropdownRoot = ({ children }: RootProps) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");

  return (
    <DropdownContext.Provider
      value={{
        open,
        setOpen,
        label,
        setLabel,
      }}
    >
      <div className="relative flex items-center justify-center">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

type DropdownTriggerType = {
  rightIcon?: ReactNode;
} & ButtonProps;
export const DropdownTrigger = ({
  title,
  rightIcon,
  ...rest
}: DropdownTriggerType) => {
  const context = useContext(DropdownContext);
  return (
    <Button
      onClick={() => context?.setOpen((prev) => !prev)}
      className="min-w-24 flex items-center justify-between"
      {...rest}
    >
      {context?.label ? context?.label : rest.children}
      {rightIcon && rightIcon}
    </Button>
  );
};

type DropdownMenuProps = {
  children: ReactNode;
};

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const context = useContext(DropdownContext);

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
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(e.target as Node)
    ) {
      context?.setOpen(false);
    }
  };

  if (!context?.open) return null;
  return (
    <div
      className="w-max rounded-[7px] flex flex-col items-start absolute top-10 drop-shadow-lg bg-white p-1 gap-1 max-h-40 overflow-y-auto mt-1"
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
  icon?: ReactNode;
};
export const DropdownMenuItem = ({ children, icon }: DropdownMenuItemProps) => {
  const context = useContext(DropdownContext);
  return (
    <button
      onClick={() => {
        const value = children?.toString() ?? "";
        context?.setLabel(value);
        context?.setOpen(false);
      }}
      className="hover:bg-slate-100 rounded-[7px] min-h-8 text-sm w-full text-start px-2 flex items-center justify-start gap-1"
    >
      {icon && icon}
      {children}
    </button>
  );
};

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Title: DropdownMenuTitle,
  Menu: DropdownMenu,
  MenuItem: DropdownMenuItem,
};
