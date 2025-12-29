import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

/* ===================== REQUEST INTERCEPTOR ===================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("accountId");

    // ================= AUTH REQUIRED =================
    // JWT token bhejo (login ke alawa)
    if (token && config.url !== "/login") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ================= AUTH FREE (ACCOUNT BASED) =================
    const accountBasedRoutes = ["/agents", "/interactions"];

    const isAccountBasedRoute = accountBasedRoutes.some((route) =>
      config.url?.startsWith(route)
    );

    if (accountId && isAccountBasedRoute) {
      config.headers["X-Account-Id"] = accountId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===================== RESPONSE INTERCEPTOR ===================== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

      // Auto logout on 401 Unauthorized
    if (status === 401 && url !== "/login") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("accountId");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

/* ===================== AUTH APIs ===================== */

// ✅ LOGIN → OAuth2 compatible (form-data)
export const loginApi = (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  return api.post("/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
