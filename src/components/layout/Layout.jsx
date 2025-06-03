import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../pages/Auth/Login";
import Group from "../../pages/Group/Group";
import Register from "../../pages/Auth/Register";
import Profile from "../../pages/Profile/Profile";
import GroupDetail from "../../pages/GroupDetail/GroupDetail";
import { useEffect, useState } from "react";
import ChatPage from "../../pages/ChatGroup/ChatPage";
import GroupSettingsPage from "../../pages/GroupSetting/GroupSettingsPage";
import Header from "./Header";

const Layout = ({
  isLoggedIn,
  setIsLoggedIn,
  checkLogin,
  userLocalStorage,
}) => {
  const [isIngroup, setIsInGroup] = useState(
    JSON.parse(localStorage.getItem("isIngroup")) || false
  );
  
  useEffect(() => {
    localStorage.setItem("isIngroup", JSON.stringify(isIngroup));
  }, [isIngroup]);
  
  return (
    <>
      {isLoggedIn && (
        <Header
          setIsLoggedIn={setIsLoggedIn}
          checkLogin={checkLogin}
          userLocalStorage={userLocalStorage}
          isIngroup={isIngroup}
          setIsInGroup={setIsInGroup}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Group setIsInGroup={setIsInGroup} />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} checkLogin={checkLogin} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/group"
          element={isLoggedIn ? <Group /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/group-detail" element={<GroupDetail />} />
        <Route path="/chat-group" element={<ChatPage />} />
        <Route path="/group-settings" element={<GroupSettingsPage />} />
      </Routes>
    </>
  );
};

export default Layout;
