import React from "react";

import { useToastStore } from "@/store/toast/useToastStore";

import { ToastItem } from "./ToastItem";

export const Toast: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2 mt-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
