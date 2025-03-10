import axios from "./axios";

const userApi = {
  getAllUser: () => axios.get("/user/getuser"),
  getProfile: (id) => axios.post("/profile", id),
  updateProfile: (data) => axios.post("/profile/update-profile", data),
};

export default userApi;
