import { FaEdit, FaTrash } from "react-icons/fa";
import { convertRole } from "../../../utils/convert";

const GroupItem = ({ group, onDelete, onEdit, onClick }) => {
  return (
    <div
      onClick={() => onClick(group.id)}
      className="grid grid-cols-6 gap-4 mt-2 w-full text-center items-center bg-gray-100 p-4 mb-2 rounded-lg shadow-md cursor-pointer"
    >
      <h3 className="text-lg font-semibold">{group.name}</h3>
      <p className="text-gray-600">{group.shortDescription}</p>
      <p className="text-sm font-semibold">{convertRole(group.role)}</p>
      <p className="text-sm">{group.memberCount}</p>
      <p className="text-sm">{group.projectCount}</p>
      <div className="flex justify-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
            onEdit(group.id);
          }}
          className="bg-yellow-500 text-white px-3 py-2 rounded-lg flex items-center gap-2"
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(group.id);
          }}
          className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-2"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default GroupItem;
