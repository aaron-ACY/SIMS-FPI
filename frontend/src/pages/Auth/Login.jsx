import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

// Inline SVG Icons
const Icons = {
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Lock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  Eye: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  EyeOff: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
  ),
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  )
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("student_lecturer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(username, password, role);

      if (result.success) {
        if (result.redirect === "/admin") {
          navigate("/admin/dashboard");
        } else {
          navigate(result.redirect);
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#08060d] flex items-center justify-center overflow-hidden font-sans">
      {/* Background with dynamic overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-110"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          animation: 'slowZoom 20s infinite alternate ease-in-out'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-[#aa3bff]/20 backdrop-blur-[3px]"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between min-h-screen py-12 gap-12">
        
        {/* LEFT SIDE: Branding & Slogan */}
        <div className="flex-1 flex flex-col justify-center text-white space-y-8 animate-fade-in-up">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-12 h-12 bg-[#aa3bff] rounded-xl flex items-center justify-center text-3xl font-black shadow-lg shadow-[#aa3bff]/30 group-hover:rotate-12 transition-transform">S</div>
            <span className="text-4xl font-black tracking-tighter hover:text-[#aa3bff] transition-colors">SIMS.</span>
          </div>

          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] mb-6">
              Empowering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aa3bff] to-[#cc80ff]">Education.</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed opacity-80 border-l-4 border-[#aa3bff] pl-6 hidden lg:block">
              Hệ thống quản lý tích hợp giúp số hóa quy trình đào tạo, 
              kết nối giảng viên và sinh viên trong một nền tảng duy nhất.
            </p>
          </div>

          <Button
            variant="ghost"
            onPress={() => navigate("/")}
            className="group flex items-center gap-2 text-white/70 hover:text-white w-fit px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all backdrop-blur-sm mx-auto lg:mx-0"
          >
            <Icons.ArrowLeft />
            <span>Back to home</span>
          </Button>
        </div>

        {/* RIGHT SIDE: Modern Glassmorphism Login Box */}
        <div className="w-full lg:max-w-[540px] animate-fade-in-right">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 lg:p-14 border border-white/20">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-black text-[#08060d] mb-3 tracking-tight">Chào mừng trở lại!</h2>
              <p className="text-gray-500 font-medium">Hệ thống thông tin sinh viên - Đăng nhập</p>
            </div>

            {/* Role Switcher */}
            <div className="flex bg-gray-100/80 p-1.5 rounded-2xl mb-8 relative">
              <div 
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-md transition-all duration-300 ease-out ${
                  role === "admin" ? "translate-x-full" : "translate-x-0"
                }`}
              />
              <button
                type="button"
                onClick={() => setRole("student_lecturer")}
                className={`flex-1 py-3 text-sm font-bold rounded-xl z-10 transition-colors duration-300 ${
                  role === "student_lecturer" ? "text-[#aa3bff]" : "text-gray-400"
                }`}
              >
                Sinh viên & GV
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-3 text-sm font-bold rounded-xl z-10 transition-colors duration-300 ${
                  role === "admin" ? "text-[#aa3bff]" : "text-gray-400"
                }`}
              >
                Quản trị viên
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 text-red-600 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 animate-shake">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  {error}
                </div>
              )}

              <Input
                label="Tài khoản"
                value={username}
                onChange={setUsername}
                placeholder="Email"
                icon={<Icons.User />}
                isRequired
              />

              <div className="relative group">
                <Input
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  icon={<Icons.Lock />}
                  isRequired
                  suffix={
                    <div onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                    </div>
                  }
                />
                <div className="absolute right-1 top-0">
                   <a href="#" className="text-xs font-bold text-[#aa3bff] hover:underline">Quên mật khẩu?</a>
                </div>
              </div>

              <Button
                type="submit"
                isDisabled={isLoading}
                variant="sims"
                className="w-full h-16 rounded-2xl text-lg font-black"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Đăng Nhập Hệ Thống"
                )}
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500 font-medium">
                Gặp sự cố đăng nhập? <a href="#" className="text-[#aa3bff] font-bold hover:underline">Liên hệ kỹ thuật</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}} />
    </div>
  );
};

export default Login;
