import axios from "./axios";

const chatGroupApi = {
  joinChat: (id) => axios.get("/chat/joinchat", { params: { groupId: id } }),
  getGroupChat: (id) => axios.get("/chat/getGroupChat", { params: { groupId: id } }),
};

export default chatGroupApi;
