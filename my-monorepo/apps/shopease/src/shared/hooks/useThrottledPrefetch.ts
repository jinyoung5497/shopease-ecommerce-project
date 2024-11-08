import { useQueryClient, QueryKey, QueryFunction } from "@tanstack/react-query";
import { useRef } from "react";

type UseThrottledPrefetchOptions = {
  queryKey: QueryKey;
  queryFn: QueryFunction;
  delay?: number;
};

const useThrottledPrefetch = ({
  queryKey,
  queryFn,
  delay = 3000,
}: UseThrottledPrefetchOptions) => {
  const queryClient = useQueryClient();
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  const prefetchData = () => {
    if (!throttleTimeout.current) {
      // 첫 호출은 즉시 실행
      queryClient.prefetchQuery({
        queryKey,
        queryFn,
      });

      // 이후 호출을 일정 시간 동안 막기 위한 타이머 설정
      throttleTimeout.current = setTimeout(() => {
        // 타이머가 끝나면 다시 null로 설정하여 다음 호출이 가능하도록 함
        throttleTimeout.current = null;
      }, delay);
    }
  };

  return prefetchData;
};

export default useThrottledPrefetch;
