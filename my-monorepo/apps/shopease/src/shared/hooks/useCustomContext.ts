import { useContext } from "react";

export const useCustomContext = <T>(
  customContext: React.Context<T | null>
): T => {
  const context = useContext(customContext);

  if (!context) throw new Error("context is out of boundary");

  return context;
};
