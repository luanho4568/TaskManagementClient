import { useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import userApi from "../../../api/Client/userApi";
import { toast } from "react-toastify";

const Profile = () => {
  const location = useLocation();
  const navigator = useNavigate();

  // Nhận dữ liệu từ location.state
  const data = location.state || {};

  console.log(">>> check data : ",data)

  // State quản lý dữ liệu nhập
  const [avatar, setAvatar] = useState(data.avatar || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [name, setName] = useState(data.name || "");
  const [email, setEmail] = useState(data.email || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [address, setAddress] = useState(data.address || "");
  const [bio, setBio] = useState(data.bio || "");


  const BASE_URL = window.location.origin;

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      setAvatarFile(file);
    }
  };

  const handleRemove = () => {
    setAvatar(null);
  };

  const handleBack = () => {
    navigator(-1);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("User.Id", data.id);
    formData.append("User.Name", name);
    formData.append("User.Email", email);
    formData.append("User.Phone", phone);
    formData.append("User.Address", address);
    formData.append("User.Bio", bio);
    if (avatarFile) {
      formData.append("File", avatarFile);
    }

    const res = await userApi.updateProfile(formData);
    if (res.status === 0) {
      toast.success(res.message);

      const updatedUser = {
        ...data,
        name: name,
        email: email,
        phone: phone,
        address: address,
        bio: bio,
        avatar: avatar,
      };

      var localStorageUser = {
        nameid : updatedUser.id,
        fullname : updatedUser.name,
        avatar : updatedUser.avatar,
      }
      localStorage.setItem("user", JSON.stringify(localStorageUser));
      localStorage.setItem("avatar", JSON.stringify({avatar : updatedUser.avatar}));
      navigator("/profile", { state: updatedUser });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-[90vh] sub-bg">
      <div className="w-full max-w-3xl h-5/6 bg-white shadow-lg rounded-xl p-6 flex">
        {/* Cột trái - Avatar và một số thông tin */}
        <div className="w-2/5 flex flex-col items-center border-r pr-4">
          <h2 className="text-lg font-semibold mb-4">Hồ sơ cá nhân</h2>
          <img
            src={avatar || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-md"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatar-upload"
            onChange={handleUpload}
          />
          <div className="flex flex-col gap-2 mt-3 w-full">
            <label
              htmlFor="avatar-upload"
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-600"
            >
              <FaUpload /> Chọn ảnh
            </label>
            <button
              onClick={handleRemove}
              className={`px-3 py-1 text-sm rounded-md flex items-center justify-center gap-2 transition ${
                avatar
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!avatar}
            >
              <FaTrash /> Xóa ảnh
            </button>
          </div>
          <div className="mt-4 w-full">
            <label className="text-gray-600 text-sm">Bio</label>
            <textarea
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Giới thiệu bản thân..."
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            <label className="text-gray-600 text-sm mt-2 block">
              Link cá nhân
            </label>
            <input
              type="url"
              className="w-full p-2 border rounded-md text-sm bg-gray-300"
              placeholder="Nhập link cá nhân"
              value={`${BASE_URL}/Person/${String(data.personalLink).padStart(4, "0")}`}
              readOnly
            />
          </div>
        </div>

        {/* Cột phải - Thông tin cá nhân */}
        <div className="w-3/5 pl-4">
          <div className="space-y-3">
            <input type="hidden" value={data.id} />
            <div>
              <label className="text-gray-600 text-sm">Họ và tên</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Nhập họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm">Địa chỉ</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Nhập địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm">Số điện thoại</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Nút Lưu */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="bg-red-200 text-white p-3 text-sm rounded-md hover:bg-red-600"
              onClick={handleBack}
            >
              Quay lại
            </button>
            <button
              className="bg-green-500 text-white p-3 text-sm rounded-md hover:bg-green-600"
              onClick={handleUpdate}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
