import {
  FaBell,
  FaRegCommentDots,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import userApi from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const Header = ({ setIsLoggedIn }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigator = useNavigate();
  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };
  let user = JSON.parse(localStorage.getItem("user")) || {};
  let fullName = user.fullname || "N/A";
  let id = user.nameid || null;
  const handleLogout = async () => {
    try {
      const res = await authApi.logoutUser({ id });
      if (res.status === 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success(res.message);
        setIsLoggedIn(false);
        navigator("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetProfile = async () => {
    try {
      const res = await userApi.getProfile({ id });
      if (res.status === 0) {
        toggleDropdown(null);
        navigator("/profile",{state : res.data});
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetDocument = () => {
    toast.info("Sắp diễn ra...");
    toggleDropdown(null);
  };
  return (
    <div className="w-full h-16 host-bg text-white flex items-center justify-between px-4 shadow-md fixed top-0 left-0 z-50">
      <button
        className="bg-red-500 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="rotate-180" /> Logout
      </button>

      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <FaRegCommentDots
            className="w-6 h-6 cursor-pointer"
            onClick={() => toggleDropdown("messages")}
          />
          {activeDropdown === "messages" && (
            <div className="absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-md p-2 max-h-48 overflow-y-auto">
              <p className="border-b p-2">Tin nhắn 1</p>
              <p className="border-b p-2">Tin nhắn 2</p>
              <p className="p-2">Tin nhắn 3</p>
            </div>
          )}
        </div>

        <div className="relative">
          <FaBell
            className="w-6 h-6 cursor-pointer"
            onClick={() => toggleDropdown("notifications")}
          />
          {activeDropdown === "notifications" && (
            <div className="absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-md p-2 max-h-48 overflow-y-auto">
              <p className="border-b p-2">Thông báo 1</p>
              <p className="border-b p-2">Thông báo 2</p>
              <p className="p-2">Thông báo 3</p>
            </div>
          )}
        </div>

        <div className="relative">
          <FaUserCircle
            className="w-6 h-6 cursor-pointer"
            onClick={() => toggleDropdown("userMenu")}
          />
          {activeDropdown === "userMenu" && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md p-2">
              <p className="border-b p-2 cursor-pointer hover:bg-gray-100">
                {fullName}
              </p>
              <p
                className="border-b p-2 cursor-pointer hover:bg-gray-100"
                onClick={handleGetDocument}
              >
                Tài liệu
              </p>
              <p
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={handleGetProfile}
              >
                Hồ sơ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
