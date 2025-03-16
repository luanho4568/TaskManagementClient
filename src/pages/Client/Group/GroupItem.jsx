import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit, FaTrash } from "react-icons/fa";
import { convertRole } from "../../../utils/convert";

const GroupItem = ({ group, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: group.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="grid grid-cols-6 gap-4 mt-2 w-full text-center items-center bg-gray-100 p-4 mb-2 rounded-lg shadow-md cursor-pointer"
      >
        <h3 className="text-lg font-semibold">{group.name}</h3>
        <p className="text-gray-600">{group.shortDescription}</p>
        <p className="text-sm font-semibold">{convertRole(group.role)}</p>
        <p className="text-sm">{group.memberCount}</p>
        <p className="text-sm">{group.projectCount}</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(group.id)}
            className="bg-yellow-500 text-white px-3 py-2 rounded-lg flex items-center gap-2"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(group.id)}
            className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-2"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupItem;
