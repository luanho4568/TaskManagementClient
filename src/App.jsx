import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import useAuth from "./hooks/useAuth";
import { ClipLoader } from "react-spinners";

const App = () => {
  const { isLoggedIn, setIsLoggedIn, loading, checkLogin, userLocalStorage } = useAuth();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Sau 1.5s mới bắt đầu fadeIn
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading || !fadeIn) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader size={50} color="#ada2f2" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <ToastContainer position="top-center" autoClose={2000} />
      <Layout
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        checkLogin={checkLogin}
        userLocalStorage={userLocalStorage}
      />
    </div>
  );
};

export default App;
