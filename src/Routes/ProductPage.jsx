import axios from "axios";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Features/Cart/cartSlice";
import dayjs from "dayjs";
import { Url } from "../url";


export async function loader({ params }) {
  const res = await axios.get(
    Url+"/products/item/" + params.productId
  );

  const product = res.data;
  const reviewsRes = await axios.get(
    Url+"/reviews/product/" + params.productId
  );
  const reviews = reviewsRes.data;

  const productsRes = await axios.get(Url+"/products");

  const products = productsRes.data;
  return { product, reviews, products };
}

function ProductPage() {
  const { product, reviews, products } = useLoaderData();
  console.log(reviews);
  const items = useSelector((state) => state.allCart.carts);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (items) {
      const isInCart = items.some((item) => item._id === product._id);
      setIsInCart(isInCart);
    }
  }, [items, product._id]);

  const dispatch = useDispatch();
  const [isInCart, setIsInCart] = useState(false);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (isInCart) {
      dispatch(removeFromCart({ productId: product._id }));
    } else {
      dispatch(addToCart(product));
      console.log(product);
    }

    setIsInCart(!isInCart);
  };

  const handleBuyNowClick = (e) => {
    e.preventDefault();
    if (user) {
      if (isInCart) {
        dispatch(removeFromCart({ productId: product._id }));
      } else {
        dispatch(addToCart(product));
        console.log(product);
      }

      setIsInCart(!isInCart);
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };
  return (
    <main className="container mx-auto flex flex-col gap-12">
      <section className="flex lg:flex-row flex-col mt-20 ">
        <img
          className=" max-h-96 w-full object-contain"
          src={Url+product.image}
          alt="productImage"
        />

        <div className="flex flex-col gap-16 text-center">
          <h2 className="font-semibold mt-8 lg:mt-0 text-3xl font-serif">{product.title}</h2>
          <p className=" text-gray-500  font-serif">
            {product.description}
          </p>
          <span className="font-semibold">
            MRP : &#x20B9;{product.mrp}{" "}
            <span className="text-gray-400 ml-4 text-sm">
              inclusive of all taxes
            </span>
          </span>

          <div className="flex justify-center gap-4">
            <Link
              onClick={handleCartClick}
              className="rounded text-center bg-slate-700 text-white  w-28 px-2 py-2 text-sm font-semibold"
            >
              {isInCart ? "Remove" : "Add to Cart"}
            </Link>
            <Link
              onClick={handleBuyNowClick}
              className="rounded text-center bg-teal-700  text-white w-28 px-2 py-2 text-sm font-semibold"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-semibold ml-5 mb-4">Reviews</h2>

        {reviews.length > 0 ?<ul className="px-5">
          {reviews.map((review) => {
            return (
              <li key={review._id} className=" p-4 border ">
                <div className="flex flex-row gap-4">
                  <button className="bg-green-600 p-1 rounded flex flex-row items-center gap-1">
                    <span className=" text-xs font-semibold text-white">
                      {review.rating}
                    </span>
                    <img className="w-4" src="/icons/star.svg" alt="" />
                  </button>
                </div>
                <p>{review.content}</p>
                <div className="flex justify-between  items-center gap-1 text-gray-500 font-semibold">
                  <div className="flex flex-row gap-1">
                    <span>{review.author}</span>
                    <img className="w-4 " src="/icons/verified.svg" alt="" />
                  </div>
                  <span className=" self-end">
                    {dayjs(review.createdAt).format("MMM  YYYY")}
                  </span>
                </div>
              </li>
            );
          })}
        </ul> : <div ><h3 className="text-center p-10 text-gray-600/50 font-bold text-lg">No reviews Yet!</h3></div>}
      </section>
      <section>
        <div className="container mx-auto">
          <h2 className="font-semibold text-xl mb-12 "> You may also like</h2>
          <ul className="px-5 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7  gap-12 ">
            {products.slice(0, 7).map((product) => {
              return (
                <li key={product._id}>
                  <Link to={"/products/item/" + product._id} className="flex flex-col justify-center items-center">
                    <img
                      className=" object-cover h-48 transition duration-300 ease-in-out hover:scale-110"
                      src={Url+product.image}
                      alt="product"
                    />
                    <h2 className="font-semibold text-md">{product.title}</h2>
                    <span className="font-semibold text-gray-600">
                      {" "}
                      &#x20B9;{product.mrp}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
