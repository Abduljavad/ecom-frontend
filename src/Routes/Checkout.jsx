import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../Features/Address/addressSlice";
import { clearCart } from "../Features/Cart/cartSlice";
import { useEffect, useState } from "react";
import NewAddressForm from "../Components/AddAddressForm/NewAddressForm";
import { Url } from "../url";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [discountCoupon, setDiscountCoupon] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [error, setError] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allCart.carts);
  const currentaddress = useSelector((state) => state.address.address);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const totalAmount = products.reduce(
    (total, item) => total + item.quantity * item.mrp,
    0
  );
  const handleAddAddres = () => {
    setShowForm(!showForm);
  };

  const handleAddressSubmit = (updatedAddress) => {
    axios
      .post(Url+"/addresses", {
        name: updatedAddress.name,
        phone: updatedAddress.phone,
        address: updatedAddress.address,
        pin: updatedAddress.pin,
        user: user._id,
      })
      .then((res) => {
        console.log(res);
        setAllAddress((prevAddresses) => [...prevAddresses, res.data]);
        setShowForm(false);
      })
      .catch((err) => console.log(err));
  };
  const handleAddressDelete = (addressId) => {
    axios
      .delete(Url+"/addresses/" + addressId)
      .then((res) => {
        console.log(res);
        setAllAddress((prevAddresses) =>
          prevAddresses.filter((address) => address._id !== addressId)
        );
      })
      .catch((err) => console.log(err));
  };
  const handleCheckout = async () => {
    try {
      navigate("/success")
      const orderRes = await axios.post(
            Url+"/orders",
            {
              products: products.map((product) => product._id),
              user: user._id,
              shippingAddress: currentaddress._id,
            },
            { withCredentials: true }
          );
          console.log("Order Created", orderRes.data)
          dispatch(clearCart())
    } catch (error) {
      console.error("Error while checkout", error);
    }
  };
  useEffect(() => {
    axios
      .get(Url+"/addresses/" + user._id)
      .then((res) => {
        console.log(res.data);
        setAllAddress(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleApplyCoupon = async () => {
    try {
      const res = await axios.get(Url+"/coupons");
      const couponData = res.data;
      const enteredCoupon = couponData.find(
        (coupon) => coupon.couponCode === discountCoupon
      );

      if (enteredCoupon) {

      const currentDate = new Date();
      const expiryDate = new Date(enteredCoupon.expiresIn)

      if(currentDate > expiryDate){
        setError("Coupon Expired")
      } else {
        const discount = enteredCoupon.discountAmount;
        setDiscountedAmount(discount);
        setError("");
      }
        
      } else {
        setError("Enter a valid Coupon");
      }
      setDiscountCoupon("");
    } catch (err) {
      console.error("error while applying coupon", err);
    }
  };
  const finalAmount = totalAmount - discountedAmount;
  return (
    <main className="flex flex-col md:flex-row px-8  justify-between container mx-auto my-20">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Shipping Address</h2>
          <button
            onClick={handleAddAddres}
            className="bg-slate-600 w-fit px-2 py-1 rounded text-white font-semibold"
          >
            Add new address
          </button>
        </div>
        {showForm && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-black p-8 rounded shadow-lg w-96">
              <NewAddressForm
                onCloseForm={handleAddAddres}
                onSubmit={handleAddressSubmit}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold">Billing Details</h3>
          <span className="font-semibold text-gray-600">Select an Address</span>
          <ul className="flex flex-col gap-8">
            {allAddress.map((address, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-row justify-between items-start"
                >
                  <div className="flex flex-row gap-3 ">
                    <input
                      type="radio"
                      name="address"
                      className="self-start mt-1 accent-black"
                      onChange={() => dispatch(addAddress(address))}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold ">
                        {address.name}
                      </span>
                      <span className="font-semibold ">
                        {address.address}
                      </span>
                      <span className="font-semibold ">
                        {address.phone}
                      </span>
                      <span className="font-semibold ">
                        Pin : {address.pin}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => handleAddressDelete(address._id)}>
                    <img src="/icons/del.svg" alt="" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="md:w-2/5 mt-10 flex flex-col gap-12">
        <div className=" shadow-lg  rounded-2xl  h-fit">
          <div className="bg-teal-600 p-4 mb-4 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Order Total</h3>
          </div>
          <span className="text-slate-500 font-semibold p-4 text-xl ">
            Products
          </span>
          <hr className="mt-4" />
          <div className="p-6">
            <ul className="mt-4 flex flex-col gap-2 mb-6">
              {products.map((product) => {
                return (
                  <li
                    key={product._id}
                    className="flex justify-between items-center font-semibold"
                  >
                    <span>{product.title}</span>
                    <span>
                      $ {product.mrp} * {product.quantity}
                    </span>
                  </li>
                );
              })}
            </ul>
            {discountedAmount > 0 && (
              <div className="font-semibold text-green-500 flex justify-between">
                Discount Applied{" "}
                <span>
                  -$ <span className=" line-through">{discountedAmount}</span>
                </span>
              </div>
            )}
            <hr />
            <div className="flex justify-between items-center font-semibold mt-6 mb-6">
              <span className="text-xl">Total</span>
              <span>$ {finalAmount}</span>
            </div>
            <hr />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Discount Coupon</h3>
          <div className="flex flex-row gap-2 items-center">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={discountCoupon}
              onChange={(e) => setDiscountCoupon(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-slate-600 px-4 py-2 rounded text-white font-semibold"
            >
              Apply
            </button>
          </div>
          {error ? (
            <span className="p-2 bg-red-100 text-red-500 rounded font-semibold">
              {error}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-4 shadow-lg  rounded-xl">
          <div className="bg-teal-600 p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Payment</h3>
          </div>
          <ul className="font-semibold flex flex-col gap-2 p-6">
            <li>
              <input
                className="accent-black mr-2"
                type="radio"
                name="options"
                disabled
              />
              <span className="text-slate-400">Wallet</span>
            </li>
            <li>
              <input
                className="accent-black mr-2"
                type="radio"
                name="options"
              />
              <span >Cash on delivery</span>
            </li>
            <li>
              <input
                className="accent-black mr-2"
                type="radio"
                name="options"
                disabled
              />
              <span className="text-slate-400">Online payment</span>
            </li>
            <button
              onClick={handleCheckout}
              className="bg-slate-600 w-full self-center py-1 rounded text-white font-semibold uppercase  mt-6 "
            >
              Pay now $ {finalAmount}
            </button>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
