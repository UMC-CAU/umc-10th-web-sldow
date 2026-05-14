import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT exp 클레임을 읽어 만료 임박 여부를 확인 (서명 검증 X — 단지 사전 refresh 결정용)
function isAccessTokenExpiringSoon(token: string, bufferSec = 3): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (typeof payload.exp !== "number") return false;
    return payload.exp * 1000 - Date.now() < bufferSec * 1000;
  } catch {
    return true;
  }
}

// 동시 요청에서 refresh가 중복 호출되어 백엔드 RT 회전 정책에 의해
// 두 번째 호출이 실패하는 race condition을 막기 위해 단일 in-flight Promise를 공유한다.
let refreshPromise: Promise<string> | null = null;

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const performRefresh = async (): Promise<string> => {
  const authData = localStorage.getItem("auth");
  if (!authData) throw new Error("No auth data");

  const { refreshToken } = JSON.parse(authData);
  const response = await axios.post(`${API_BASE_URL}/v1/auth/refresh`, {
    refresh: refreshToken,
  });

  const {
    accessToken,
    refreshToken: newRefreshToken,
    id,
    name,
  } = response.data.data;

  localStorage.setItem(
    "auth",
    JSON.stringify({
      ...JSON.parse(authData),
      id,
      name,
      accessToken,
      refreshToken: newRefreshToken,
    }),
  );

  return accessToken as string;
};

const logoutAndRedirect = () => {
  localStorage.removeItem("auth");
  if (!window.location.pathname.startsWith("/login")) {
    window.location.href = "/login";
  }
};

const ensureFreshAccessToken = async (): Promise<string | null> => {
  const authData = localStorage.getItem("auth");
  if (!authData) return null;

  const { accessToken } = JSON.parse(authData);
  if (!accessToken) return null;

  if (!isAccessTokenExpiringSoon(accessToken)) return accessToken;

  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return await refreshPromise;
};

// Request 인터셉터: 만료 임박이면 사전 refresh 후 헤더 부착
axiosInstance.interceptors.request.use(
  async (config) => {
    // /auth/refresh 자체는 재귀 방지를 위해 그대로 통과
    if (config.url?.includes("/auth/refresh")) return config;

    try {
      const accessToken = await ensureFreshAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch {
      // refresh 실패 시는 그냥 헤더 없이 보냄 — 서버 401 받고 아래 catch로 처리
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response 인터셉터: 그래도 401이면 강제 로그아웃
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (error.response?.status === 401 && originalRequest) {
      if (!originalRequest._retry && !originalRequest.url?.includes("/auth/refresh")) {
        originalRequest._retry = true;

        try {
          if (!refreshPromise) {
            refreshPromise = performRefresh().finally(() => {
              refreshPromise = null;
            });
          }
          const accessToken = await refreshPromise;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          logoutAndRedirect();
          return Promise.reject(refreshError);
        }
      }

      logoutAndRedirect();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
