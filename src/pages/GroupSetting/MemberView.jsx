import React, { useEffect, useState } from "react";
import groupMemberApi from "../../api/groupMemberApi";
import { BASE_URL } from "../../helper/helper";

const MemberView = ({ groupId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?.nameid;

  useEffect(() => {
    if (!groupId) return;

    const fetchMembers = async () => {
      try {
        const res = await groupMemberApi.getAllGroup(groupId);
        if (res.status === 0) {
          console.log("Lấy thành viên thành công:", res.data);
          setMembers(res.data);
        } else {
          console.error("Lỗi khi lấy thành viên:", res.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [groupId]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        👥 Thành viên nhóm
      </h2>

      {loading ? (
        <p>Đang tải danh sách...</p>
      ) : members.length === 0 ? (
        <p className="text-gray-500">Nhóm chưa có thành viên nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, index) => {
            const isCurrentUser = member.groupMembers?.userId === userId;
            return (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition"
              >
                <img
                  src={
                    member.avatar
                      ? `${BASE_URL}/${member.avatar}`
                      : "/default-avatar.png"
                  }
                  alt={member.userName}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800 flex items-center">
                    {member.userName}
                    {isCurrentUser && (
                      <span className="ml-2 px-2 py-0.5 text-xs text-white bg-blue-500 rounded-full">
                        Bạn
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    {member.groupMembers?.role || "Thành viên"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MemberView;
