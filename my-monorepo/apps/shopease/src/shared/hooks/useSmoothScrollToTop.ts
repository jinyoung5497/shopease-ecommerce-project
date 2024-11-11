import { useCallback } from "react";

export const useSmoothScrollToTop = () => {
  return useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
};
