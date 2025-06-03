import groupApi from "../api/groupApi";

const getGroup = async (groupId) => {
  try {
    const res = await groupApi.getGroup(groupId);
    if (res.status === 0) {
      return { success: true, data: res.data };
    } else {
      return { success: false, message: res.message };
    }
  } catch (error) {
    console.error("API getGroup error:", error);
    return { success: false, message: error.message || "Lỗi kết nối API" };
  }
};

export default {
  getGroup,
};
