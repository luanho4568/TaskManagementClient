import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const GroupInfoModal = ({
  group,
  members,
  onClearChatHistory = () => alert("Xóa lịch sử trò chuyện"),
  onLeaveGroup = () => alert("Rời nhóm"),
  onClose,
}) => {
  useEffect(() => {
    console.log("GroupInfoModal mounted with group:", group);
  }, []);
  return (
    <div className="flex flex-col h-full border rounded shadow-lg bg-white">
      <button
        onClick={onClose}
        className="md:hidden absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        aria-label="Đóng"
      >
        <FaTimes size={24} />
      </button>

      {/* Phần 1: Avatar, tên nhóm, status */}
      <div className="flex items-center gap-4 p-4 border-b">
        <img
          src={group.avatar}
          alt={group.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{group.name}</h2>
          <span
            className={`inline-block px-2 py-1 text-xs rounded ${
              group.status === "Public"
                ? "bg-green-100 text-green-800"
                : group.status === "Private"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {group.status}
          </span>
        </div>
      </div>

      {/* Phần 2: Danh sách thành viên */}
      <div className="flex-grow overflow-y-auto p-4">
        <h3 className="text-lg font-semibold mb-3">
          Thành viên ({members.length})
        </h3>
        <ul className="space-y-2">
          {members.map((m, i) => (
            <li key={i} className="flex items-center gap-3">
              <img
                src={m.avatar}
                alt={m.userName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{m.userName}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Phần 3: Nút Xóa lịch sử, Rời nhóm */}
      <div className="p-4 border-t flex gap-3 justify-center">
        <button
          onClick={onClearChatHistory}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded py-2 font-semibold"
        >
          Xóa lịch sử trò chuyện
        </button>
        {!group.isDefault && (
          <button
            onClick={onLeaveGroup}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded py-2 font-semibold"
          >
            Rời khỏi nhóm
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupInfoModal;
