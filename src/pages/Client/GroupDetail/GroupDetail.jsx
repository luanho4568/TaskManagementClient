import { FaComments, FaProjectDiagram, FaArrowLeft } from "react-icons/fa";

const GroupDetail = () => {
  return (
    <div className="pt-20 sub-bg h-screen">
      <div className="flex items-center justify-center gap-16 mt-10">
        <div className="flex flex-col items-center">
          <button className="host-bg w-24 h-24 flex items-center justify-center rounded-full shadow-xl text-white text-5xl">
            <FaComments />
          </button>
          <span className="mt-3 text-2xl">Thảo luận</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="host-bg w-24 h-24 flex items-center justify-center rounded-full shadow-xl text-white text-5xl">
            <FaProjectDiagram />
          </button>
          <span className="mt-3 text-2xl">Dự án</span>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
