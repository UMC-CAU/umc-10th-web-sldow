import { useLocalStorage } from "./useLocalStorage";

export interface AuthData {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export function useAuth() {
  const { storedValue, setValue, removeValue } =
    useLocalStorage<AuthData | null>({
      key: "auth",
      initialValue: null,
    });

  const isLoggedIn = !!storedValue?.accessToken;

  const logout = () => {
    removeValue();
  };

  return {
    authData: storedValue,
    setAuthData: setValue,
    isLoggedIn,
    logout,
  };
}
