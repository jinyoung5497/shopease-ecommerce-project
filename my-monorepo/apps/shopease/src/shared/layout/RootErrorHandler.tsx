import { ErrorPage } from "@/shared/error/ErrorPage";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface RootErrorBoundaryProps {
  children: ReactNode;
}

export const RootErrorBoundary: React.FC<RootErrorBoundaryProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};
