import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import authApi from "../../api/authApi";
import GroupLayout from "./GroupLayout";
import Profile from "../../pages/Profile/Profile";
import Header from "./Header";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.CheckToken();
        if (res.status === 0) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              nameid: res.data.nameid,
              fullname: res.data.unique_name,
            })
          );
          setIsLoggedIn(true);
        } else {
          toast.warn(res.message);
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <GroupLayout />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/group"
          element={isLoggedIn ? <GroupLayout /> : <Navigate to="/" />}
        />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Layout;
