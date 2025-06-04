import groupApi from "../../api/groupApi";
import "../../assets/css/JoinGroupPopup.css";
import Swal from "sweetalert2";
import { showError, showSuccess, showWarning } from "../../helper/alertHelper";

const JoinGroupPopup = () => {
  const handleJoinGroup = () => {
    Swal.fire({
      title: '<h2 class="join-group-title">Tham gia Nhóm</h2>',
      html: `
        <div class="join-group-container" style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
          <input 
            id="joinInput" 
            placeholder="Nhập ID nhóm" 
            class="join-group-input"
          />
          <textarea 
            id="joinDesc" 
            placeholder="Mô tả hoặc yêu cầu vào nhóm" 
            rows="4"
            class="join-group-textarea"
          ></textarea>
        </div>
      `,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Tham gia",
      cancelButtonText: "Hủy",
      customClass: {
        popup: "join-group-popup",
        confirmButton: "btn-confirm",
        cancelButton: "btn-cancel",
        actions: "join-group-actions",
      },
      buttonsStyling: false,
      preConfirm: () => {
        const token = document.getElementById("joinInput").value.trim();
        const description = document.getElementById("joinDesc").value.trim();

        if (!token) {
          Swal.showValidationMessage("Vui lòng nhập ID nhóm");
          return false;
        }
        return { token, description };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await groupApi.memberJoinGroup(result.value);
          if (response.status === 0) {
            showSuccess(response.message);
          } else if (response.status === -2) {
            showWarning(response.message);
          } else {
            showError(response.message);
          }
        } catch {
          showError("Đã có lỗi xảy ra khi tham gia nhóm");
        }
      }
    });
  };

  return (
    <button
      onClick={handleJoinGroup}
      className="flex items-center px-4 py-2 bg-[#ada2f2] text-white rounded-lg gap-2 hover:bg-[#988ae6] transition"
    >
      Tham gia Nhóm
    </button>
  );
};

export default JoinGroupPopup;
