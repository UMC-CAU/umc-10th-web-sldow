//미션용 error, loading 관리 커스텀 훅

import { useEffect, useState } from "react";

export const useCustomFetch = <T>(
    fetchFn: () => Promise<T>, //인자 받고 실행하는 것 보다, 그냥 함수 자체를 받은 뒤
    deps: any[] = [] // 필요한 의존성은 호출하는 쪽에서 관리하는 걸로
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const result = await fetchFn();
          setData(result);
        } catch (e) {
          setError(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      };
  
      void fetchData();
    }, [...deps]); 
  
    return { data, isLoading, error };
  };