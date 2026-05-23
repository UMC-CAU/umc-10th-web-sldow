import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const elapsed = Date.now() - lastExecuted.current;

    if (elapsed >= interval) {
      setThrottledValue(value);
      lastExecuted.current = Date.now();
      return;
    }

    const timerId = setTimeout(() => {
      setThrottledValue(value);
      lastExecuted.current = Date.now();
    }, interval - elapsed);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, interval]);

  return throttledValue;
}
