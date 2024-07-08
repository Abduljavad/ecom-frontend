import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Url } from "../../url";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    axios
      .get(Url+"/users")
      .then((response) => {
        setUsers(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = async (userId) => {
    try {
 
      await axios.delete(Url+"/users/"+userId);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User successfully deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(`User with ID ${userId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  console.log(users);
  return (
    <main className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full bg-white rounded-2xl shadow-lg font-semibold">
        <thead className="bg-teal-400 rounded-2xl">
          <tr>
            <th className="py-5 px-4 border-b">User Name</th>
            <th className="py-5 px-4 border-b">Profile picture</th>
            <th className="py-5 px-4 border-b">Email</th>
            <th className="py-5 px-4 border-b">Created at</th>
            <th className="py-5 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b text-center">
              <td className="py-8 px-4">{user.userName}</td>
              <td className="py-8 px-4 flex flex-col items-center gap-2">
                <img
                  className="w-12 rounded-full"
                  src={user.profilePicture}
                  alt=""
                />
              </td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>

              <td className="py-8 px-4">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default UsersPage;
