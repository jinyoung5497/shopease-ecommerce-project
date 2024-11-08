import { PropsWithChildren, useEffect, useState } from "react";

// DeferredComponent children을 Props로 받고, 100ms이 지나기 전에는 children을 화면에 렌더하지 않는 컴포넌트입니다.
export const DeferredComponent = ({ children }: PropsWithChildren<{}>) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    // 200ms 지난 후 children Render
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
};
