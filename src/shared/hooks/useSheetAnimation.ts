import { useState, useEffect } from "react";

// 애니메이션이 끝난 후에 컴포넌트를 제거하도록 설정 하는 훅
export const useSheetAnimation = (open: boolean | undefined) => {
  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    // `context.open` 상태가 변경될 때 애니메이션 실행을 위한 상태 업데이트
    if (open) {
      setShouldRender(true);
    } else {
      // `slide-out` 애니메이션을 실행한 후 컴포넌트 제거
      const timer = setTimeout(() => setShouldRender(false), 300); // 애니메이션 길이와 일치
      return () => clearTimeout(timer);
    }
  }, [open]);

  return shouldRender;
};
