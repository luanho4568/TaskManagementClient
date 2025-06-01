import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../../pages/Client/Auth/Login";
import Group from "../../../pages/Client/Group/Group";
import Register from "../../../pages/Client/Auth/Register";
import Profile from "../../../pages/Client/Profile/Profile";
import Header from "./Header";
import GroupDetail from "../../../pages/Client/GroupDetail/GroupDetail";
import { useEffect, useState } from "react";
import ChatPage from "../../../pages/Client/ChatGroup/ChatPage";

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
      </Routes>
    </>
  );
};

export default Layout;
