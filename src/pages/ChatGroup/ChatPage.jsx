import React, { useState, useEffect, useRef } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaEllipsisV,
  FaComments,
  FaUserFriends,
  FaBars,
  FaPaperPlane,
} from "react-icons/fa";
import GroupInfoModal from "./GroupInfoModal";
import { useLocation } from "react-router-dom";
import chatGroupApi from "../../api/chatGroupApi";

const GroupChatPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showGroupChats, setShowGroupChats] = useState(true);
  const [showMembers, setShowMembers] = useState(true);
  const [showFriends, setShowFriends] = useState(true);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showMemberList, setShowMemberList] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);

  const sidebarRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const nameid = userInfo.nameid || null;

  const location = useLocation();
  const groupId = location.state?.groupId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await chatGroupApi.getGroupChat(groupId);
        if (res.status === 0) {
          setGroups(res.data.chatGroup);
          setMembers(res.data.groupMembers || []);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  const handleChatSelect = (type, item) => {
    setActiveChat({
      type,
      id: item.id,
      name: type === "member" ? item.userName : item.name,
    });
    setChatMessages([]);
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    setChatMessages((prev) => [
      ...prev,
      { text: message.trim(), sender: "You" },
    ]);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        setShowSidebar(false);
      }
    }

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  return (
    <div className="flex relative h-[90vh]">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 h-[90vh] bg-gray-100 w-64 p-4 overflow-y-auto transition-transform duration-300 md:static md:translate-x-0 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Group Chats */}
        <div className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowGroupChats(!showGroupChats)}
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaComments /> Nhóm chat
            </h2>
            {showGroupChats ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showGroupChats && (
            <ul className="mt-2 ml-4 space-y-1">
              {groups.length === 0 ? (
                <li className="text-gray-500">Không có nhóm nào</li>
              ) : (
                groups.map((group) => (
                  <li
                    key={group.id}
                    onClick={() => handleChatSelect("group", group)}
                    className={`hover:bg-gray-200 p-2 rounded cursor-pointer flex items-center gap-2 ${
                      activeChat?.id === group.id
                        ? "bg-blue-100 font-semibold"
                        : ""
                    }`}
                  >
                    <img
                      src={`https://i.pravatar.cc/30?u=${group.name}`}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    {group.name}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Members */}
        <div className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowMembers(!showMembers)}
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaUserFriends /> Thành viên
            </h2>
            {showMembers ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showMembers && (
            <ul className="mt-2 ml-4 space-y-1">
              {members.filter((m) => m.groupMembers.userId !== nameid)
                .length === 0 ? (
                <li className="text-gray-500">Không có thành viên</li>
              ) : (
                members
                  .filter((m) => m.userId !== nameid)
                  .map((member, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleChatSelect("member", member)}
                      className={`hover:bg-gray-200 p-2 rounded cursor-pointer flex items-center gap-2 ${
                        activeChat?.name === member.userName
                          ? "bg-blue-100 font-semibold"
                          : ""
                      }`}
                    >
                      <img
                        src={member.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                      {member.userName}
                    </li>
                  ))
              )}
            </ul>
          )}
        </div>

        {/* Friends */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowFriends(!showFriends)}
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaUserFriends /> Bạn bè
            </h2>
            {showFriends ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showFriends && (
            <div className="text-gray-500 mt-2 ml-4">
              Tính năng đang cập nhật...
            </div>
          )}
        </div>
      </div>

      {/* Main Chat + Modal */}
      <div className="flex flex-1 overflow-hidden">
        {activeChat ? (
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  className="md:hidden text-2xl"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  <FaBars />
                </button>
                <h2 className="text-xl font-semibold">{activeChat.name}</h2>
              </div>
              <button
                onClick={() => setShowGroupInfo((prev) => !prev)}
                className="text-xl"
              >
                <FaEllipsisV />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
              {chatMessages.length === 0 ? (
                <div className="text-gray-500">
                  <p>
                    Đây là cuộc trò chuyện của{" "}
                    <strong>{activeChat.name}</strong>
                  </p>
                  <p>(Mô phỏng nội dung chat ở đây...)</p>
                </div>
              ) : (
                chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded ${
                      msg.sender === "You"
                        ? "bg-blue-100 self-end"
                        : "bg-gray-200"
                    } max-w-xs break-words`}
                  >
                    <strong>{msg.sender}: </strong>
                    {msg.text}
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-2 flex-shrink-0">
              <textarea
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border rounded p-2 resize-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Chọn nhóm hoặc thành viên để bắt đầu trò chuyện</p>
          </div>
        )}

        {/* GroupInfoModal */}
        {showGroupInfo && activeChat && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setShowGroupInfo(false)}
            ></div>
            <div className="fixed inset-0 z-50 bg-white md:relative md:w-80 md:border-l md:border-gray-300 md:bg-white md:z-0">
              <GroupInfoModal
                group={
                  activeChat?.type === "group"
                    ? groups.find((g) => g.id === activeChat.id)
                    : null
                }
                members={members}
                showMemberList={showMemberList}
                setShowMemberList={setShowMemberList}
                onClose={() => setShowGroupInfo(false)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupChatPage;
