import React, { useEffect, useState } from "react";
import groupMemberApi from "../../api/groupMemberApi";
import { BASE_URL } from "../../helper/helper";

const MemberList = ({ groupId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user"))?.nameid;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await groupMemberApi.getAllMember(groupId);
        if (res.status === 0) {
          setMembers(res.data);
        } else {
          console.error("Lỗi lấy thành viên:", res.message);
        }
      } catch (error) {
        console.error("Lỗi API:", error);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) fetchMembers();
  }, [groupId]);

  return (
    <div>
      {loading ? (
        <p>Đang tải...</p>
      ) : members.length === 0 ? (
        <p className="text-gray-500">Chưa có thành viên nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, index) => {
            const { groupMembers } = member;
            const isCurrentUser = groupMembers?.userId === userId;
            const status = groupMembers?.status;
            const role = groupMembers?.role || "Thành viên";

            return (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-xl shadow-sm border hover:shadow-md"
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
                  <div className="flex items-center flex-wrap gap-2">
                    <p className="font-medium text-gray-800">
                      {member.userName}
                    </p>
                    {isCurrentUser && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                        Bạn
                      </span>
                    )}
                    {status === "Pending" && (
                      <span className="text-xs bg-yellow-400 text-white px-2 py-0.5 rounded-full">
                        Chờ duyệt
                      </span>
                    )}
                    {status === "Banned" && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                        Bị cấm
                      </span>
                    )}
                    {status === "Rejected" && (
                      <span className="text-xs bg-gray-400 text-white px-2 py-0.5 rounded-full">
                        Đã từ chối
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MemberList;
