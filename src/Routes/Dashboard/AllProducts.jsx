import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../../url";

function AllProducts() {
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    axios
      .get(Url+"/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(Url+"/products/"+productId);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success("Product successfully deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(`Product with ID ${productId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  console.log(products);
  return (
    <main className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <table className="min-w-full bg-white rounded-2xl shadow-lg font-semibold">
        <thead className="bg-teal-400 rounded-2xl">
          <tr>
            <th className="py-5 px-4 border-b">Product Name</th>
            <th className="py-5 px-4 border-b">Product Image</th>
            <th className="py-5 px-4 border-b">Category</th>
            <th className="py-5 px-4 border-b">Price</th>
            <th className="py-5 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b text-center">
              <td className="py-8 px-4">{product.title}</td>
              <td className="py-8 px-4 flex flex-col items-center gap-2">
                <img
                  className="w-12"
                  src={Url+product.image}
                  alt=""
                />
              </td>
              <td>{product.category.title}</td>
              <td>${product.mrp}</td>
              <td className="py-8 px-4">
                <button
                  onClick={() => handleDelete(product._id)}
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
export default AllProducts;
