import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FaPlus, FaUserPlus } from "react-icons/fa"; // Icon thêm nhóm & tham gia nhóm
import { groupsData } from "./GroupData";
import GroupItem from "./GroupItem";

const GroupList = () => {
  const [groups, setGroups] = useState(groupsData);

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
    setGroups(groups.filter((group) => group.id !== id));
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

  return (
    <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-4 overflow-auto h-[600px] text-center">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold">Danh sách tất cả nhóm</h2>
        </div>
        <p className="text-gray-500 text-sm">Tổng số nhóm: {groups.length}</p>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg gap-2">
            <FaUserPlus /> Tham gia Nhóm
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg gap-2">
            <FaPlus /> Thêm Nhóm
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 w-full text-center font-semibold bg-gray-200 p-3 rounded-lg">
        <p>Tên nhóm</p>
        <p>Mô tả</p>
        <p>Vai trò</p>
        <p>Thành viên</p>
        <p>Trạng thái</p>
        <p>Hành động</p>
      </div>

      {/* Draggable Groups */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={groups} strategy={verticalListSortingStrategy}>
          {groups.map((group) => (
            <GroupItem
              key={group.id}
              group={group}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default GroupList;
