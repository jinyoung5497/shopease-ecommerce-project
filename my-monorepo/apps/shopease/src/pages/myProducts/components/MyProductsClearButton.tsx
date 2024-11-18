import { Button } from "@repo/ui/button/Button";
import { UseFormResetField } from "react-hook-form";

type MyProductsClearButtonProps = {
  resetField: UseFormResetField<{
    title: string;
    price: number;
    remainder: number;
    description: string;
    image?: any;
  }>;
  setImageNameList: React.Dispatch<React.SetStateAction<string[]>>;
  field:
    | "title"
    | "price"
    | "remainder"
    | "description"
    | "remainder"
    | "image";
};

export const MyProductsClearButton = ({
  resetField,
  setImageNameList,
  field,
}: MyProductsClearButtonProps) => {
  return (
    <Button
      onClick={(event) => {
        event.preventDefault();
        resetField(field);
        if (field === "image") setImageNameList([]);
      }}
      variant="link"
    >
      <i className="fi fi-rs-cross-small"></i>
    </Button>
  );
};
