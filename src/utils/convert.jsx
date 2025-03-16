const convertRole = (role) => {
  switch (role) {
    case "Member":
      return "Thành viên";
    case "Manager":
      return "Quản lý";
    case "Owner":
      return "Chủ nhóm";
    default:
      return "Không xác định"; // Tránh lỗi khi có giá trị lạ
  }
};
export { convertRole };
