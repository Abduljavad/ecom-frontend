import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../../url";

function AllCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(Url+"/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(Url+"/categories/"+categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
      toast.success("Category successfully deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(`Category with ID ${categoryId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
console.log(categories)
  return (
    <main className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">All Categories</h1>
      <table className="min-w-full bg-white rounded-2xl shadow-lg font-semibold">
        <thead className="bg-teal-400 rounded-2xl">
          <tr>
            <th className="py-5 px-4 border-b">Category Name</th>
            <th className="py-5 px-4 border-b">Category Image</th>
            <th className="py-5 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b text-center">
              <td className="py-8 px-4">{category.title}</td>
              <td className="py-8 px-4 flex flex-col items-center gap-2">
              <img className="w-12" src={Url+category.image} alt="" />
              </td>
              <td className="py-8 px-4">
                <button
                  onClick={() => handleDelete(category._id)}
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

export default AllCategories;
