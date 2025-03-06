
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
const App = () => {
 

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Layout />
    </>
  );
};

export default App;
