import authApi from "../api/authApi";

const authService = {
  CheckToken: async () => {
    try {
      const res = await authApi.CheckToken();
      return res;
    } catch (error) {
      return error;
    }
  },

  loginUser: async (data) => {
    try {
      const res = await authApi.loginUser(data);
      return res;
    } catch (error) {
      return error;
    }
  },

  logoutUser: async (id) => {
    try {
      const res = await authApi.logoutUser(id);
      return res;
    } catch (error) {
      return error;
    }
  },

  registerUser: async (data) => {
    try {
      const res = await authApi.registerUser(data);
      return res;
    } catch (error) {
      return error;
    }
  },
};

export default authService;
