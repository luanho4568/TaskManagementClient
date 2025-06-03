import { useEffect, useState } from "react";
import authApi from "../api/authApi";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocalStorage, setUserLocalStorage] = useState({});

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
        const newUser = {
          nameid: res.data.nameid,
          fullname: res.data.unique_name,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUserLocalStorage(newUser); localStorage.setItem(
          "user",
          JSON.stringify({
            nameid: res.data.nameid,
            fullname: res.data.unique_name,
          })
        );

        setIsLoggedIn(true);
      } else {
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

  useEffect(() => {
   checkLogin();
  }, []);

  return { isLoggedIn, setIsLoggedIn, loading, checkLogin , userLocalStorage };
};

export default useAuth;
