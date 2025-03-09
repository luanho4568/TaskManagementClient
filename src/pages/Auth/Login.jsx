import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { FaUser, FaLock, FaGoogle, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import authApi from "../../api/authApi";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleLogin = async () => {
    let newErrors = { email: !email, password: !password };

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      toast.warn("Vui lòng nhập đủ thông tin!");
      return;
    }
    setLoading(true);
    const res = await authApi.loginUser({ email, password });
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
        <div
          className={`flex items-center border ${
            errors.email ? "border-red-900" : "border-gray-100"
          } bg-gray-100 rounded-md p-4 mt-4`}
        >
          <FaUser
            className={`text-lg mr-2 ${
              errors.email ? "text-red-500" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: false });
            }}
            className="bg-transparent w-full outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
          />
        </div>

        <div
          className={`flex items-center border ${
            errors.password ? "border-red-900" : "border-gray-100"
          } bg-gray-100 rounded-md p-4 mt-4`}
        >
          <FaLock
            className={`text-lg mr-2 ${
              errors.password ? "text-red-500" : "text-gray-500"
            }`}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: false });
            }}
            className="bg-transparent w-full outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
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
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
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
    </AuthLayout>
  );
};

export default Login;
