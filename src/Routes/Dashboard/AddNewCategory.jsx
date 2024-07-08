import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../../url";

function AddNewCategory() {
    const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const navigate = useNavigate()

  const handleTitleChange = (event) => {
    setCategoryTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setCategoryImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', categoryTitle);
    formData.append('image', categoryImage);
    console.log(formData)
    try {
      const response = await axios.post(Url+'/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Category successfully added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setCategoryTitle("");
      setCategoryImage(null);
      navigate('/dashboard/admin/all-categories')
      console.log('Category added successfully:', response.data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  return (
    <main className="flex flex-col justify-center items-center">
        <div className="max-w-xl w-full mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Title:</label>
          <input
            type="text"
            value={categoryTitle}
            onChange={handleTitleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Add Category
        </button>
      </form>
    </div>
    </main>
  )
}

export default AddNewCategory