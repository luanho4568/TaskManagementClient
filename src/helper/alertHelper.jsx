import Swal from "sweetalert2";

/**
 * Hiển thị thông báo thành công
 * @param {string} message - Nội dung thông báo
 */
export const showSuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    confirmButtonColor: "#3085d6",
  });
};

/**
 * Hiển thị thông báo lỗi
 * @param {string} message - Nội dung thông báo
 */
export const showError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    confirmButtonColor: "#d33",
  });
};


/**
 * Hiển thị hộp thoại xác nhận trước khi thực hiện hành động
 * @param {string} message - Nội dung xác nhận
 * @returns {Promise<boolean>} - Trả về `true` nếu người dùng xác nhận, `false` nếu hủy
 */
export const showConfirm = (message) => {
  return Swal.fire({
    title: "Xác nhận",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Hủy",
  }).then((result) => result.isConfirmed);
};