import { useEffect } from "react";
import userApi from "../api/userApi";
import { useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAllUser();
        if (!response.status) {
          setUsers(response);
          return;
        }
        setUsers(response);
      } catch (error) {
        console.log("Lỗi API:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Danh sách người dùng</h1>
      {users.data != null ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.phone}
            </li>
          ))}
        </ul>
      ) : (
        <p>{users.message}</p>
      )}
    </>
  );
};

export default Home;
