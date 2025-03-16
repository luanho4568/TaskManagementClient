import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Client/Layout";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { isLoggedIn, setIsLoggedIn, loading, checkLogin, userLocalStorage } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} checkLogin={checkLogin} userLocalStorage={userLocalStorage}/>
    </>
  );
};

export default App;
