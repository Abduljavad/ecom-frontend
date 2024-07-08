import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Product from "../Components/ProductCard/Product";
import { Url } from "../url";

export async function loader() {
  const res = await axios.get(Url+"/products");
  const products = res.data;
  return { products };
}
function HomePage() {
  const { products } = useLoaderData();
  return (
    <main className="mb-36 ">
      <section className="w-full lg:h-96  mb-20 ">
        <img
          className="w-full h-full object-cover"
          src="/images/coverPic.png"
          alt=""
        />
      </section>
      <section className="flex flex-row justify-center items-center">
        <div className="container mx-auto">
          <h2 className="font-bold text-3xl mb-12 text-center">
            {" "}
            Latest Collections
          </h2>
          <ul  className=" px-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  gap-12 ">
            {products.slice(0, 4).map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
