import { useState, useEffect } from "react";
import GroupItem from "./GroupItem";
import JoinGroupPopup from "./JoinGroupPopup";
import CreateGroupPopup from "./CreateGroupPopup";
import groupApi from "../../api/groupApi";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../helper/alertHelper";
import { useNavigate } from "react-router-dom";

const GroupList = ({ setIsInGroup }) => {
  const [groups, setGroups] = useState([]);
  const navigator = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?.nameid;
  const fetchGroups = async () => {
    try {
      const response = await groupApi.getAllGroup(userId);
      if (response.status === 0) {
        setGroups(response.data);
      } else {
        showError(response.message);
      }
    } catch {
      showError("Lỗi kết nối đến server");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = await showConfirm(
      "Bạn có chắc chắn muốn xóa nhóm này?"
    );
    if (!confirmDelete) return;

    try {
      const res = await groupApi.deleteGroup(id, userId);
      if (res.status === 0) {
        setGroups(groups.filter((group) => group.id !== id));
        showSuccess(res.message);
      } else {
        showError(res.message);
      }
    } catch {
      showError("Lỗi khi xóa nhóm!");
    }
  };

  const handleEdit = (id) => {
    const newName = prompt("Nhập tên mới:");
    if (newName) {
      setGroups(
        groups.map((group) =>
          group.id === id ? { ...group, name: newName } : group
        )
      );
    }
  };

  const joinGroup = async (id) => {
    try {
      const res = await groupApi.joinGroup(id);
      if (res.status === 0) {
        setIsInGroup(true);
        navigator("/group-detail", { state: { groupId: id , role: res.role} });
      } else {
        showError(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-4 overflow-auto h-[600px] text-center">
      <div className="flex justify-between items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Danh sách tất cả nhóm</h2>
        <p className="text-gray-500 text-sm">Tổng số nhóm: {groups.length}</p>
        <div className="flex gap-4">
          <JoinGroupPopup />
          <CreateGroupPopup fetchGroups={fetchGroups} />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 w-full text-center font-semibold bg-gray-200 p-3 rounded-lg">
        <p>Tên nhóm</p>
        <p>Mô tả</p>
        <p>Vai trò</p>
        <p>Thành viên</p>
        <p>Dự án</p>
        <p>Hành động</p>
      </div>

      {groups.length > 0 ? (
        groups.map((group) => (
          <GroupItem
            key={group.id}
            group={group}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onClick={() => joinGroup(group.id)}
          />
        ))
      ) : (
        <p className="text-gray-500 mt-4">Bạn chưa có nhóm nào.</p>
      )}
    </div>
  );
};

export default GroupList;
