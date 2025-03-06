import authApi from "../api/authApi";

const authService = {
  checkUserLogin: async () => {
    try {
      const res = await authApi.checkUserLogin();
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

  logoutUser: async () => {
    try {
      const res = await authApi.logoutUser();
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
