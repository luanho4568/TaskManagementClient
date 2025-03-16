import axios from "./axios";

const groupApi = {
  getAllGroup: (id) => axios.get("/group/getallgroup?userId=" + id),
  createGroup: (data) => axios.post("/group/creategroup", data),
};

export default groupApi;
