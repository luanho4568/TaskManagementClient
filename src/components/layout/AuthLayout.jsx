import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";

const AuthLayout = ({ children }) => {
  return (
    <>
      <section className="h-screen host-bg flex justify-evenly items-center flex-col">
        <span className="w-110 h-auto sub-bg flex flex-col items-center justify-around rounded-3xl p-8 shadow-lg">
          {children}
          <div>
            <button
              className="flex items-center justify-center gap-2 bg-red-600 text-white p-4 mt-4 w-80 rounded-md font-bold hover:bg-red-700 transition"
              onClick={() => toast.info("Sắp diễn ra...")}
            >
              <FaGoogle size={20} /> Đăng nhập với Google
            </button>
          </div>
        </span>
      </section>
    </>
  );
};
export default AuthLayout;
