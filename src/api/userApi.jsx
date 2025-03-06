import axios from "./axios";

const userApi = {
    getAllUser: () => axios.get("/User/GetUser")
}

export default userApi;