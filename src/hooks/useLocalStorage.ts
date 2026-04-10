import { useState, useCallback } from "react";

interface useLocalStorageProps<T> {
  key: string;
  initialValue: T;
}


export function useLocalStorage<T>({ key, initialValue }: useLocalStorageProps<T>) {
  // 초기 렌더에만 실행: 키에 문자열이 있으면 JSON 파싱, 없거나 실패 시 initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        //반환값을 저장하든지 그냥 값을 저장
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // 키 삭제
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return { storedValue, setValue, removeValue };
}
