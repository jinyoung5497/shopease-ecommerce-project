import { CheckCircle, Info, X, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useToastStore } from "@/store/toast/useToastStore";

interface ToastItemProps {
  toast: {
    id: number;
    message: string;
    type: "success" | "error" | "info";
  };
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const [visible, setVisible] = useState(false);
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id]);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, toast.id, removeToast]);

  let backgroundColor = "bg-gray-800";
  let Icon = Info;
  if (toast.type === "success") {
    backgroundColor = "bg-green-500";
    Icon = CheckCircle;
  } else if (toast.type === "error") {
    backgroundColor = "bg-red-500";
    Icon = XCircle;
  }

  return (
    <div
      className={`max-w-md w-full ${backgroundColor} shadow-lg rounded-lg pointer-events-auto
      flex ring-1 ring-black ring-opacity-5
      transition-transform duration-300 transform ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
      }`}
    >
      <div className="flex-1 p-4 flex items-center">
        <Icon className="mr-2 text-white" size={20} />
        <p className="text-sm font-medium text-white">{toast.message}</p>
      </div>
      <div className="flex border-l border-black border-opacity-10">
        <button
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-white hover:text-gray-200 focus:outline-none"
          onClick={() => setVisible(false)}
        >
          <span className="sr-only">닫기</span>
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
