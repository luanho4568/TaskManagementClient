import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import GroupItem from "./GroupItem";
import JoinGroupPopup from "./JoinGroupPopup";
import CreateGroupPopup from "./CreateGroupPopup";
import groupApi from "../../../api/Client/groupApi";
import { showError } from "../../../helper/alertHelper";

const GroupList = () => {
  const [groups, setGroups] = useState([]); // Khởi tạo state rỗng

  // 🛑 Lấy userId từ localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?.nameid;

  // 🛑 Hàm fetch dữ liệu nhóm từ API
  const fetchGroups = async () => {
    try {
      const response = await groupApi.getAllGroup(userId);
      if (response.status === 0) {
        setGroups(response.data);
      } else {
        showError(response.message);
      }
    } catch {
      showError('Lỗi kết nối đến server');
    }
  };

  useEffect(() => {
      fetchGroups();
  }, []); 

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setGroups((groups) => {
        const oldIndex = groups.findIndex((g) => g.id === active.id);
        const newIndex = groups.findIndex((g) => g.id === over.id);
        return arrayMove(groups, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id) => {
    setGroups(groups?.filter((group) => group.id !== id));
  };

  const handleEdit = (id) => {
    const newName = prompt("Nhập tên mới:");
    if (newName) {
      setGroups(
        groups?.map((group) =>
          group.id === id ? { ...group, name: newName } : group
        )
      );
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-4 overflow-auto h-[600px] text-center">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Danh sách tất cả nhóm</h2>
        <p className="text-gray-500 text-sm">Tổng số nhóm: {groups?.length ?? 0}</p>
        <div className="flex gap-4">
          <JoinGroupPopup />
          <CreateGroupPopup fetchGroups={fetchGroups} />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 w-full text-center font-semibold bg-gray-200 p-3 rounded-lg">
        <p>Tên nhóm</p>
        <p>Mô tả</p>
        <p>Vai trò</p>
        <p>Thành viên</p>
        <p>Dự án</p>
        <p>Hành động</p>
      </div>

      {/* Draggable Groups */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={groups} strategy={verticalListSortingStrategy}>
          {groups.length > 0 ? (
            groups.map((group) => (
              <GroupItem
                key={group.id}
                group={group}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p className="text-gray-500 mt-4">Bạn chưa có nhóm nào.</p>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default GroupList;
