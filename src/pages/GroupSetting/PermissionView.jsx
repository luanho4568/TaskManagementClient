const PermissionView = ({ groupId }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🛡️ Phân quyền thành viên</h2>
      <p>Phân quyền cho các thành viên của nhóm ID: {groupId}</p>
      {/* Sau này có thể thêm danh sách thành viên + checkbox quyền */}
    </div>
  );
};

export default PermissionView;
