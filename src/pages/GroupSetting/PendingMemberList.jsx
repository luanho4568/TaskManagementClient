import React, { useEffect, useState } from "react";
import groupMemberApi from "../../api/groupMemberApi";
import { BASE_URL } from "../../helper/helper";
import Swal from "sweetalert2";

const PendingMemberList = ({ groupId }) => {
  const [pendingMembers, setPendingMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await groupMemberApi.getAllMember(groupId, "pending");
        if (res.status === 0) {
          setPendingMembers(res.data);
        } else {
          console.error("Lỗi lấy thành viên chờ duyệt:", res.message);
        }
      } catch (error) {
        console.error("Lỗi API:", error);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) fetchPending();
  }, [groupId]);

  const handleApprove = async (userId) => {
    const result = await Swal.fire({
      title: "Phê duyệt thành viên?",
      text: "Bạn có chắc muốn PHÊ DUYỆT thành viên này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Phê duyệt",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await groupMemberApi.approveMember(groupId, userId);
      if (res.status === 0) {
        setPendingMembers((prev) =>
          prev.filter((m) => m.groupMembers.userId !== userId)
        );
        if (activeUserId === userId) setActiveUserId(null);
        Swal.fire("Thành công", "Thành viên đã được phê duyệt", "success");
      } else {
        Swal.fire("Lỗi", res.message, "error");
      }
    } catch (error) {
      console.error("Lỗi phê duyệt:", error);
      Swal.fire("Lỗi", "Không thể phê duyệt thành viên", "error");
    }
  };

  const handleReject = async (userId) => {
    const result = await Swal.fire({
      title: "Từ chối thành viên?",
      text: "Bạn có chắc muốn TỪ CHỐI thành viên này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Từ chối",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await groupMemberApi.rejectMember(groupId, userId);
      if (res.status === 0) {
        setPendingMembers((prev) =>
          prev.filter((m) => m.groupMembers.userId !== userId)
        );
        if (activeUserId === userId) setActiveUserId(null);
        Swal.fire("Đã từ chối", "Thành viên đã bị từ chối", "success");
      } else {
        Swal.fire("Lỗi", res.message, "error");
      }
    } catch (error) {
      console.error("Lỗi từ chối:", error);
      Swal.fire("Lỗi", "Không thể từ chối thành viên", "error");
    }
  };

  const handleClickMember = (userId) => {
    if (window.innerWidth >= 768) return;
    setActiveUserId((prev) => (prev === userId ? null : userId));
  };

  return (
    <div>
      {loading ? (
        <p>Đang tải...</p>
      ) : pendingMembers.length === 0 ? (
        <p className="text-gray-500">Không có thành viên nào đang chờ duyệt.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingMembers.map((member, index) => (
            <div
              key={index}
              className="relative group bg-yellow-50 p-4 rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
              onClick={() => handleClickMember(member.groupMembers.userId)}
            >
              {/* PC: hiện khi hover */}
              <div className="hidden group-hover:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 gap-2 items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(member.groupMembers.userId);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 shadow text-sm"
                >
                  Từ chối
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(member.groupMembers.userId);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 shadow text-sm"
                >
                  Phê duyệt
                </button>
              </div>

              {/* Mobile: hiện khi activeUserId trùng */}
              {activeUserId === member.groupMembers.userId && (
                <div className="flex md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 gap-2 items-center bg-yellow-100 rounded">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(member.groupMembers.userId);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 shadow text-sm"
                  >
                    Từ chối
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(member.groupMembers.userId);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 shadow text-sm"
                  >
                    Phê duyệt
                  </button>
                </div>
              )}

              {/* Thông tin thành viên */}
              <div className="flex items-center transition-opacity duration-300 group-hover:opacity-30">
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
                  <p className="font-medium text-gray-800">{member.userName}</p>
                  <p className="text-sm text-gray-500">Đang chờ phê duyệt</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingMemberList;
