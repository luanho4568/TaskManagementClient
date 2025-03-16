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
