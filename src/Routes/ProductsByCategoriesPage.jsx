import axios from "axios";
import { useLoaderData,} from "react-router-dom";
import { Url } from "../url";
import Product from "../Components/ProductCard/Product";

export async function loader({ params }) {
  const res = await axios.get(
    Url+"/products/" + params.categoryId
  );

  const products = res.data;
  const category = products[0].category;

  return { products, category };
}

function ProductsByCategoriespage() {
  const { products, category } = useLoaderData();

  return (
    <main className="container ml-auto mr-auto">
      <div className=" flex flex-col  gap-16 mt-20 px-4">
        <h2 className="font-bold text-3xl">{category.title}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-12 ">
          {products.map((product) => {
            return <Product key={product._id} product={product}/>
            // return (
            //   <Link to={"/products/item/" + product._id} key={product._id}>
            //     <li>
            //       <img
            //         className="max-w-xs transition duration-300 ease-in-out hover:scale-110 w-64 h-80 object-contain"
            //         src={Url+product.image}
            //         alt="product"
            //       />
            //       <h2 className="font-semibold text-md mt-6">
            //         {product.title}
            //       </h2>
            //       <span className="font-semibold text-gray-600">
            //         {" "}
            //         &#x20B9;{product.mrp}
            //       </span>
            //     </li>
            //   </Link>
            // );
          })}
        </ul>
      </div>
    </main>
  );
}

export default ProductsByCategoriespage;
