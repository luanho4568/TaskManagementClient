import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Users,
  FolderKanban,
  ShieldCheck,
  Settings as SettingsIcon,
} from "lucide-react";
import apiHelper from "../../helper/apiHelper";
import MemberView from "./MemberView";
import ProjectView from "./ProjectView";
import PermissionView from "./PermissionView";
import SettingView from "./SettingView";

const GroupSettingsPage = () => {
  const [group, setGroup] = useState(null);
  const [activeTab, setActiveTab] = useState("members");
  const location = useLocation();
  const groupId = location.state?.groupId;

  useEffect(() => {
    if (!groupId) return;
    fetchGroup();
  }, []);

  const fetchGroup = async () => {
    const res = await apiHelper.getGroup(groupId);
    if (res.success) {
      setGroup(res.data);
    } else {
      console.error("Lỗi lấy nhóm:", res.message);
    }
  };

  const renderTabView = () => {
    switch (activeTab) {
      case "members":
        return <MemberView groupId={groupId} />;
      case "projects":
        return <ProjectView groupId={groupId} />;
      case "permissions":
        return <PermissionView groupId={groupId} />;
      case "settings":
        return <SettingView groupId={groupId} />;
      default:
        return null;
    }
  };

  const tabList = [
    {
      key: "members",
      label: "Thành viên",
      icon: <Users size={20} className="mr-3" />,
    },
    {
      key: "projects",
      label: "Dự án",
      icon: <FolderKanban size={20} className="mr-3" />,
    },
    {
      key: "permissions",
      label: "Phân quyền",
      icon: <ShieldCheck size={20} className="mr-3" />,
    },
    {
      key: "settings",
      label: "Cài đặt",
      icon: <SettingsIcon size={20} className="mr-3" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-md border-r">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {group?.name || "Nhóm không xác định"}
          </h2>
          <p className="text-sm text-gray-500">
            {group?.settings ?? "Chưa có cài đặt mô tả nhóm"}
          </p>
        </div>

        <nav className="flex flex-col mt-6 space-y-1">
          {tabList.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center px-6 py-4 text-base font-medium transition-all text-left rounded-none ${
                activeTab === tab.key
                  ? "bg-blue-100 text-blue-600 border-l-4 border-blue-500"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="bg-white shadow rounded-lg p-6">{renderTabView()}</div>
      </main>
    </div>
  );
};

export default GroupSettingsPage;
