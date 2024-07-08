import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Url } from "../../url";

function AddNewProduct() {
  const [categories, setCategories] = useState([]);
 const navigate = useNavigate()

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const title = form["title"].value;
    const mrp = form["mrp"].value;
    const image = form["image"].files[0];
    const description = form["description"].value;
    const category = form["category"].value;

    const formData = {
      title: title,
      mrp: mrp,
      image: image,
      description: description,
      category: category,
    };
    console.log(formData);

    try {
      const response = await axios.post(
        Url+"/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product successfully added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/dashboard/admin/all-products')
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <main className="container mx-auto my-8 flex flex-col  items-center">
      <div className="w-3/5 ">
        <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              MRP:
            </label>
            <input
              type="text"
              id="mrp"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Description:
            </label>
            <input
              type="text"
              id="description"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Image:
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Category:
            </label>
            <select
              id="category"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-teal-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Add Product
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddNewProduct;
