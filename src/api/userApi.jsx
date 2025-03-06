import axios from "./axios";

const userApi = {
    getAllUser: () => axios.get("/user/getuser") ,
};

export default userApi;