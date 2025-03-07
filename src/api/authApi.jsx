import axios from "./axios";

const authApi = {
  loginUser: (data) => axios.post("/account/login", data),
  logoutUser: (id) => axios.post("/account/logout", id),
  CheckToken: () => axios.get("/account/CheckToken"),
  registerUser: (data) => axios.post("/account/register", data),
};

export default authApi;
