import axios from "./axios";

const groupApi = {
  getAllGroup: (id) => axios.get("/group/getallgroup?userId=" + id),
  getGroup: (id) => axios.get("/group/GetGroup", { params: { groupId: id } }),
  createGroup: (data) => axios.post("/group/creategroup", data),
  joinGroup: (id) => axios.get("/group/joingroup", { params: { groupId: id } }),
  memberJoinGroup: (data) => axios.post("/group/memberJoinGroup", data),
  deleteGroup: (id, userId) =>
    axios.delete("/group/deletegroup", {
      params: { groupId: id, userId: userId },
    }),
};

export default groupApi;
