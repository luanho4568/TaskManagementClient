import {
  FaComments,
  FaProjectDiagram,
  FaArrowLeft,
  FaCog,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import chatGroupApi from "../../api/chatGroupApi";
import { showError } from "../../helper/alertHelper";

const GroupDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state?.groupId;
  const role = location.state?.role;
  const isOwner = role === "Owner";
  console.log(role)
  const handleGoToChat = async () => {
    try {
      const res = await chatGroupApi.joinChat(groupId);
      if (res.status === 0) {
        navigate("/chat-group", { state: { groupId: groupId } });
      } else {
        showError(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToSettings = () => {
    navigate("/group-settings", { state: { groupId } });
  };

  return (
    <div className="pt-1 sub-bg h-screen">
      <div className="flex items-center justify-center gap-16 mt-10">
        {/* Thảo luận */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleGoToChat}
            className="host-bg w-24 h-24 flex items-center justify-center rounded-full shadow-xl text-white text-5xl"
          >
            <FaComments />
          </button>
          <span className="mt-3 text-2xl">Thảo luận</span>
        </div>

        {/* Dự án */}
        <div className="flex flex-col items-center">
          <button className="host-bg w-24 h-24 flex items-center justify-center rounded-full shadow-xl text-white text-5xl">
            <FaProjectDiagram />
          </button>
          <span className="mt-3 text-2xl">Dự án</span>
        </div>

        {/* Cài đặt (chỉ hiện nếu là owner) */}
        {isOwner && (
          <div className="flex flex-col items-center">
            <button
              onClick={handleGoToSettings}
              className="host-bg w-24 h-24 flex items-center justify-center rounded-full shadow-xl text-white text-5xl"
            >
              <FaCog />
            </button>
            <span className="mt-3 text-2xl">Cài đặt</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
