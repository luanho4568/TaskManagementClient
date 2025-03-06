import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import accountService from "../../services/authService";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import Group from "../../pages/Group";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await accountService.checkUserLogin();
      if (res.status === -2) {
        handleLogout();
      } else if (res.status === 0) {
        setIsLoggedIn(true);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    var res = await accountService.logoutUser();
    if (res.status === 0) {
      toast.success(res.message);
      setIsLoggedIn(false);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Group onLogout={handleLogout} />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/group"
            element={
              isLoggedIn ? (
                <Group onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default Layout;
