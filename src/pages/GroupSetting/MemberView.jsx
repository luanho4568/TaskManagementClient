import React, { useState } from "react";
import MemberList from "./MemberList";
import PendingMemberList from "./PendingMemberList";

const tabs = [
  { key: "members", label: "👥 Thành viên" },
  { key: "pending", label: "⏳ Duyệt thành viên" },
];

const MemberView = ({ groupId }) => {
  const [activeTab, setActiveTab] = useState("members");

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center justify-start gap-4 bg-gray-100 rounded-xl p-1 w-full max-w-md mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base
              ${
                activeTab === tab.key
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-2">
        {activeTab === "members" ? (
          <MemberList groupId={groupId} />
        ) : (
          <PendingMemberList groupId={groupId} />
        )}
      </div>
    </div>
  );
};

export default MemberView;
