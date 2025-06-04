import axios from "./axios";

const groupMemberApi = {
  getAllMember: (id, status) =>
    axios.get("/group/GetAllMember", {
      params: { groupId: id, statusMember: status },
    }),

  approveMember: (groupId, userId) =>
    axios.post("/group/ManageMemberStatus", {
      groupId,
      userId,
      status: "Active", // Trạng thái duyệt
    }),

  rejectMember: (groupId, userId) =>
    axios.post("/group/ManageMemberStatus", {
      groupId,
      userId,
      status: "Rejected", // Trạng thái từ chối
    }),
};

export default groupMemberApi;
