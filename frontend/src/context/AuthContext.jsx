import { createContext, useState, useContext, useEffect } from "react";
import { authApi } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, []);

  // eslint-disable-next-line react-refresh/only-export-components
  function mapRoleTabToBackendRole(selectedRoleTab) {
    if (selectedRoleTab === "admin") return "ADMIN";
    return "STUDENT";
  }

  async function login(username, password, selectedRoleTab) {
    try {
      const backendRole = mapRoleTabToBackendRole(selectedRoleTab);
      const result = await authApi.login({
        username,
        password,
        role: backendRole,
      });

      if (!result || (result.success === false && !result.data)) {
        return {
          success: false,
          message: result?.message || "Đăng nhập thất bại",
        };
      }

      // Backend trả về: { message: "...", data: { accessToken: "...", ... } }
      const authData = result.data;
      const accessToken = authData?.accessToken;
      
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      // Xác định role và redirect dựa vào dữ liệu thực tế từ Backend nếu có
      // Nếu Backend trả về role trong authData.user.role, hãy dùng nó.
      // Hiện tại vẫn giữ logic map theo UI và username để đảm bảo demo chạy được.
      let role = authData?.user?.role || backendRole;
      let redirect = "/student";
      let name = authData?.user?.fullName || username;

      if (selectedRoleTab === "admin") {
        role = "ADMIN";
        redirect = "/admin";
        name = "System Administrator";
      } else {
        if (String(username).toUpperCase().startsWith("GV")) {
          role = "LECTURER";
          redirect = "/lecturer";
          name = "Lecturer";
        } else {
          role = "STUDENT";
          redirect = "/student";
          name = "Student";
        }
      }

      const userData = { username, role, name };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      return { success: true, redirect };
    } catch (err) {
      console.error("Login error:", err);
      
      let errorMessage = "Lỗi kết nối máy chủ";
      
      if (err.response?.data) {
        const data = err.response.data;
        if (data.errors && Array.isArray(data.errors)) {
          errorMessage = data.errors[0];
        } else {
          errorMessage = data.message || data.title || err.message;
        }
``      } else {
        errorMessage = err.message;
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
