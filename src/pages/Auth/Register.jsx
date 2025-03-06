import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { FaUser, FaAt, FaLock, FaArrowLeft, FaGoogle } from "react-icons/fa6";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import authService from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleRegister = useCallback(async () => {
    if (!email || !name || !password || !confirmPass) {
      toast.warn("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPass) {
      toast.error("Mật khẩu xác nhận chưa chính xác!");
      return;
    }
    setLoading(true);

    const res = await authService.registerUser({ name, email, password });
    if (res.status === 0) {
      navigate("/");
      toast.success(res.message);
    } else {
      toast.error(res.message);
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPass("");
    }

    setLoading(false);
  }, [email, name, password, confirmPass, navigate]);

  return (
    <AuthLayout>
      <h2 className="text-gray-700 text-2xl font-bold text-center">Đăng ký</h2>

      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="flex items-center bg-gray-100 rounded-md p-4 mt-4">
            <FaUser className="text-gray-500 text-lg mr-2" />
            <input
              type="text"
              placeholder="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent w-full outline-none"
            />
          </div>
          <div className="flex items-center bg-gray-100 rounded-md p-4 mt-4">
            <FaAt className="text-gray-500 text-lg mr-2" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2 mb-4">
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
          <div className="flex items-center bg-gray-100 rounded-md p-4 mt-4">
            <FaLock className="text-gray-500 text-lg mr-2" />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="bg-transparent w-full outline-none"
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="flex items-center gap-2 bg-gray-300 p-4 rounded-md font-bold text-gray-700 hover:bg-gray-400 transition"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft /> Đăng nhập
          </button>

          <button
            className="bg-blue-600 text-white p-4 rounded-md font-bold hover:bg-blue-700 transition"
            onClick={handleRegister}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </div>
      </div>
      <div>
        <button className="flex items-center justify-center gap-2 bg-red-600 text-white p-4 mt-4 w-92 rounded-md font-bold hover:bg-red-700 transition">
          <FaGoogle size={20} /> Đăng nhập với Google
        </button>
      </div>
    </AuthLayout>
  );
};

export default Register;
