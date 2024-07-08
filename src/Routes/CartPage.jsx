import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addQuantity,
  clearCart,
  minusQuantity,
  removeFromCart,
} from "../Features/Cart/cartSlice";
import { Url } from "../url";

function CartPage() {
  const user = useSelector((state) => state.auth.user);

  const cartItems = useSelector((state) => state.allCart.carts);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.mrp,
    0
  );

  const dispatch = useDispatch();

  return (
    <main className=" flex flex-col  items-center">
      {cartItems.length === 0?<div className="my-auto flex flex-col gap-6">
          <h1 className="text-4xl font-bold font-mono">Your Cart is empty</h1>
          <Link to={'/categories'} className="text-lg text-center font-semibold underline text-teal-400">Add something to your cart</Link>
        </div>:<div className="container mx-auto my-8 mt-32 flex flex-col md:flex-row gap-12">
        <div className="w-full ">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-bold mb-12 ml-2">Shopping Cart</h2>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 px-4 text-lg text-white rounded font-semibold py-1"
            >
              Clear
            </button>
          </div>
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
            <table className="w-full  text-left text-sm ">
              <thead className="uppercase tracking-wider border-b-2 bg-teal-500  dark:border-white">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-4">
                    price
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-4">
                    total
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="dark:bg-neutral-600">
                {cartItems.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="border-t dark:border-white"
                    >
                      <th scope="row" className="px-6 py-4">
                        <div className="flex gap-4 items-center">
                          <img className="w-12 h-12" src={Url+item.image} alt="" />
                          <span>{item.title}</span>
                        </div>
                      </th>
                      <td className="px-6 py-4">${item.mrp}</td>
                      <td className="px-6 py-4 ">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              dispatch(removeFromCart({ productId: item._id }));
                            }
                            dispatch(minusQuantity({ title: item.title }));
                          }}
                          className="w-4 bg-slate-600  text-white"
                        >
                          -
                        </button>
                        <span className="font-semibold"> {item.quantity} </span>
                        <button
                          onClick={() => {
                            dispatch(addQuantity({ title: item.title }));
                          }}
                          className="w-4 bg-slate-600 text-white"
                        >
                          +
                        </button>
                      </td>
                      <td className="px-6 py-4">${item.quantity * item.mrp}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            dispatch(removeFromCart({ productId: item._id }))
                          }
                          className=" px-2 py-1 m-2"
                        >
                          <img src="icons/del.svg" alt="" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {totalAmount ? (
          <div className=" md:w-3/5 ">
            <h2 className="text-xl font-bold  text-center mb-12">
              Cart Summary
            </h2>
            <div className="shadow-lg font-semibold p-6 flex flex-col gap-10 rounded">
              <div className="flex flex-row justify-between mt-6">
                <span>Amount payable</span>
                <span>$ {totalAmount}</span>
              </div>
              <Link
                to={"/checkout/" + user._id}
                className="bg-teal-500 text-center px-1 py-2 rounded font-bold"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>}
    </main>
  );
}

export default CartPage;
