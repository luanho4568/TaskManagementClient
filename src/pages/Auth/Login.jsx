import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { FaUser, FaLock, FaGoogle, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import accountService from "../../services/authService";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warn("Vui lòng nhập đủ thông tin!");
      return;
    }
    setLoading(true);
    const res = await accountService.loginUser({ email, password });
    if (res.status === 0) {
      toast.success(res.message);
      localStorage.setItem("token", res.token);
      setIsLoggedIn(true);
    } else if (res.status === -1) {
      toast.error(res.message);
    } else if (res.status === -2) {
      toast.error(res.message);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h2 className="text-gray-700 text-2xl font-bold text-center">
        Đăng Nhập
      </h2>

      <div className="flex flex-col w-80">
        <div className="flex items-center bg-gray-100 rounded-md p-4 mt-4">
          <FaUser className="text-gray-500 text-lg mr-2" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent w-full outline-none"
          />
        </div>

        <div className="flex items-center bg-gray-100 rounded-md p-4 mt-4">
          <FaLock className="text-gray-500 text-lg mr-2" />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent w-full outline-none"
          />
        </div>

        <a href="#" className="hover:underline text-blue-800 text-center mt-2">
          Quên mật khẩu?
        </a>

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-600 text-white p-4 rounded-md font-bold hover:bg-blue-700 transition"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <button
            className="flex items-center gap-2 bg-gray-300 p-4 rounded-md font-bold text-gray-700 hover:bg-gray-400 transition"
            onClick={() => navigate("/register")}
          >
            <FaArrowRight /> Đăng ký
          </button>
        </div>
      </div>

      <div>
        <button className="flex items-center justify-center gap-2 bg-red-600 text-white p-4 mt-4 w-80 rounded-md font-bold hover:bg-red-700 transition">
          <FaGoogle size={20} /> Đăng nhập với Google
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
