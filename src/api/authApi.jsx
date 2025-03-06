import axios from "./axios";

const authApi = {
  loginUser: (data) => axios.post("/account/login", data),
  logoutUser: () => axios.post("/account/logout"),
  checkUserLogin: () => axios.get("/account/CheckUserLogin"),
  registerUser: (data) => axios.post("/account/register",data),
};

export default authApi;
