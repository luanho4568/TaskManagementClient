import Swal from "sweetalert2";
import "./../../../assets/css/Client/JoinGroupPopup.css"; // Import file CSS riêng

const JoinGroupPopup = () => {
  const handleJoinGroup = () => {
    Swal.fire({
      title: "Tham gia Nhóm",
      html: `
        <div class="join-group-container">
          <label class="join-group-label">Chọn phương thức tham gia</label>
          <div class="join-group-radio-group">
            <label class="join-group-radio">
              <input type="radio" name="joinType" value="link" checked> Link
            </label>
            <label class="join-group-radio">
              <input type="radio" name="joinType" value="id"> ID
            </label>
          </div>
          <input id="joinInput" class="swal2-input join-group-input" placeholder="Nhập link nhóm">
          <textarea id="joinDesc" class="swal2-textarea join-group-textarea" placeholder="Mô tả hoặc yêu cầu vào nhóm"></textarea>
        </div>
      `,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Tham gia",
      cancelButtonText: "Hủy",
      customClass: {
        popup: "join-group-popup",
      },
      didOpen: () => {
        document.querySelectorAll("input[name='joinType']").forEach((radio) => {
          radio.addEventListener("change", (e) => {
            document.getElementById("joinInput").placeholder =
              e.target.value === "link" ? "Nhập link nhóm" : "Nhập ID nhóm";
          });
        });
      },
      preConfirm: () => {
        const type = document.querySelector("input[name='joinType']:checked").value;
        const input = document.getElementById("joinInput").value;
        const desc = document.getElementById("joinDesc").value;

        if (!input) {
          Swal.showValidationMessage("Vui lòng nhập thông tin nhóm");
        }
        return { type, input, desc };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Tham gia nhóm:", result.value);
      }
    });
  };

  return (
    <button
      onClick={handleJoinGroup}
      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg gap-2"
    >
      Tham gia Nhóm
    </button>
  );
};

export default JoinGroupPopup;
