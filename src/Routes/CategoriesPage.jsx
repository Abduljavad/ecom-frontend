import axios from "axios";
import { useEffect } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Url } from "../url";

export async function loader() {
  const res = await axios.get(Url+"/categories");
  const categories = res.data;
  console.log(categories);
  return { categories };
}
function CategoriesPage() {
  const location = useLocation();

  useEffect(() => {
    const user = location.state?.user;

    if (user) {
      toast.success(`Welcome, ${user.userName}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [location.state])
  const { categories } = useLoaderData();
  return (
    <main className="container ml-auto mr-auto">
      <div className=" flex flex-col px-8">
        <h2 className="text-4xl font-bold mb-20 mt-20">Categories</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center justify-center">
          {categories.map((category) => {
            return (
              <Link key={category._id} to={"/products/" + category._id}>
                <li>
                  <img
                    className="h-96  w-72 object-cover  transition duration-300 ease-in-out hover:scale-110"
                    src={Url+category.image}
                    alt=""
                  />

                  <h3 className="font-semibold mt-3 text-lg text-center">
                    {category.title}
                  </h3>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default CategoriesPage;
