import Swal from "sweetalert2";
import groupApi from "../../api/groupApi";
import { showError, showSuccess } from "../../helper/alertHelper";

const CreateGroupPopup = ({ fetchGroups }) => {
  const handleAddGroup = () => {
    Swal.fire({
      title: "Tạo Nhóm",
      html: `
        <div class="create-group-container">
          <div class="flex justify-between items-center">
            <label for="groupPrivacy" class="swal2-label">Quyền riêng tư:</label>
            <select id="groupPrivacy" class="swal2-select create-group-select">
              <option value="Public">🔓 Công khai</option>
              <option value="Private">🔒 Riêng tư</option>
              <option value="Restricted">🛑 Hạn chế</option>
            </select>
          </div>
          <input id="groupName" class="swal2-input create-group-input" placeholder="Nhập tên nhóm">
          <textarea id="groupDesc" class="swal2-textarea create-group-textarea" placeholder="Mô tả ngắn cho nhóm"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Tạo Nhóm",
      cancelButtonText: "Hủy",
      reverseButtons: true,
      customClass: {
        popup: "create-group-popup", // Đặt tên class popup
      },
      preConfirm: () => {
        const name = document.getElementById("groupName").value.trim();
        const ShortDescription = document.getElementById("groupDesc").value.trim();
        const settings = document.getElementById("groupPrivacy").value;
        const userId = JSON.parse(localStorage.getItem("user"))?.nameid;
        if (!name) {
          Swal.showValidationMessage("Vui lòng nhập tên nhóm");
          return false;
        }
        return { name, ShortDescription, settings, userId };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await groupApi.createGroup(result.value);
          if (response.status === 0) {
            showSuccess(response.message);
            fetchGroups();
          } else {
            showError(response.message);
          }
        } catch {
          showError("Đã có lỗi xảy ra khi tạo nhóm");
        }
      }
    });
  };

  return (
    <button
      onClick={handleAddGroup}
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg gap-2"
    >
      Tạo Nhóm
    </button>
  );
};

export default CreateGroupPopup;
