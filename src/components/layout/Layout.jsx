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
        const res = await accountService.CheckToken();
        if (res.status === 0) {
          setIsLoggedIn(true);
        } else {
          toast.warn(res.message);
          setIsLoggedIn(false);
          localStorage.removeItem("token");
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
    return (
        <div></div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Group /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/group"
          element={isLoggedIn ? <Group /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default Layout;
