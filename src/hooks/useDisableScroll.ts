import { useEffect } from "react";

export const useDisableScroll = (open: boolean) => {
  // context.open이 변경될 때마다 스크롤 비활성화/활성화 처리
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // 스크롤 비활성화
      // document.body.style.paddingRight = "15px"; // 스크롤 바 너비만큼 오른쪽 패딩 추가
    } else {
      document.body.style.overflow = "auto"; // 스크롤 활성화
      // document.body.style.paddingRight = "0"; // 패딩 복구
    }

    // 컴포넌트 언마운트 시 원래 상태로 복구
    return () => {
      document.body.style.overflow = "auto";
      // document.body.style.paddingRight = "0";
    };
  }, [open]);
};
