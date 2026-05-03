import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request 인터셉터: 모든 요청에 accessToken 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const { accessToken } = JSON.parse(authData);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response 인터셉터: 401 에러 시 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const originalRequest = error.config;

    // 401 에러이고 아직 재시도하지 않았으면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const authData = localStorage.getItem("auth");
        if (!authData) {
          throw new Error("No auth data");
        }

        const { refreshToken } = JSON.parse(authData);

        // 새 accessToken 발급
        const response = await axios.post(`${API_BASE_URL}/v1/auth/refresh`, {
          refresh: refreshToken,
        });

        const {
          accessToken,
          refreshToken: newRefreshToken,
          id,
          name,
        } = response.data.data;

        // localStorage 업데이트
        localStorage.setItem(
          "auth",
          JSON.stringify({
            id,
            name,
            accessToken,
            refreshToken: newRefreshToken,
          }),
        );

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
        localStorage.removeItem("auth");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
