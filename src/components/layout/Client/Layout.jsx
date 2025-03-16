import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../../pages/Client/Auth/Login";
import Group from "../../../pages/Client/Group/Group";
import Register from "../../../pages/Client/Auth/Register";
import Profile from "../../../pages/Client/Profile/Profile";
import Header from "./Header";

const Layout = ({ isLoggedIn, setIsLoggedIn, checkLogin, userLocalStorage }) => {
  return (
    <>
      {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn}  checkLogin={checkLogin} userLocalStorage={userLocalStorage}/>}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Group />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} checkLogin={checkLogin} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/group" element={isLoggedIn ? <Group /> : <Navigate to="/" />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Layout;
