import { useEffect, useCallback } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  isOpen: boolean,
  onClose: () => void,
) => {
  // 메모이제이션을 통해 함수가 재생성되지 않도록 합니다.
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose, ref],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]); // handleOutsideClick이 변경될 때만 재실행
};
