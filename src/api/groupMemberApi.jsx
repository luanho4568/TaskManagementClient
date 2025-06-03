import axios from "./axios";

const groupMemberApi = {
  getAllGroup: (id) => axios.get("/group/GetAllMember", { params: { groupId: id } }),
};

export default groupMemberApi;
