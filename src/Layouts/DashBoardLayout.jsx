import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../Features/Auth/authSlice";
import { Url } from "../url";

const DashBoardLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);
  const [activeAccordion, setActiveAccordion] = useState("");
  const toggleAccordion = (accordionName) => {
    setActiveAccordion(activeAccordion === accordionName ? "" : accordionName);
  };
  const handleLogout = () => {
    axios
      .post(Url+"/users/logout", {}, { withCredentials: true })
      .then((data) => {
        console.log(data);
        dispatch(removeUser());
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-slate-600 w-64 p-6 text-white s">
        <Link to={''} className="text-xl font-semibold ">Admin Dashboard</Link>

        <nav className="mt-10">
          <div onClick={() => toggleAccordion("orders")} className=" mb-4  transition-all ease-in-out delay-75 duration-300 transform">
            <div className="flex ">
              <button
                className={`w-full  flex items-center gap-2 text-left py-2 px-4 focus:outline-none `}
                
              >
                <img src="/icons/orders.svg" alt="" />
                Orders
              </button>
              <img className="w-10" src="/icons/down.svg" alt="" />
            </div>
            <div
              className={`pl-4  ${
                activeAccordion === "orders"
                  ? "max-h-full translate-y-0"
                  : "max-h-0 -translate-y-8 overflow-hidden"
              } transition-transform`}
            >
              <Link to={"admin/all-orders"} className="block py-2 px-10 ">
                All Orders
              </Link>
              <Link
                to={"admin/completed-orders"}
                className="block  py-2 pl-10 "
              >
                Completed Orders
              </Link>
              <Link to={"admin/pending-orders"} className="block  py-2 pl-10 ">
                Pending Orders
              </Link>
            </div>
          </div>
          <div onClick={() => toggleAccordion("categories")} className="mb-4 transition-all ease-in-out delay-75 duration-300 transform">
            <div  className="flex ">
              <button
                className={`w-full flex items-center gap-2 text-left py-2 px-4 focus:outline-none `}
                
              >
                <img src="/icons/category.svg" alt="" />
                Categories
              </button>
              <img className="w-10" src="/icons/down.svg" alt="" />
            </div>
            <div
              className={`pl-4 ${
                activeAccordion === "categories"
                  ? "max-h-full translate-y-0"
                  : "max-h-0 -translate-y-8 overflow-hidden"
              } transition-transform
              }`}
            >
              <Link to={"admin/all-categories"} className="block py-2 px-10 ">
                All categories
              </Link>
              <Link to={"admin/add-new-category"} className="block py-2 pl-10 ">
                Add a new category
              </Link>
            </div>
          </div>

          <div onClick={() => toggleAccordion("products")} className="mb-4 transition-all ease-in-out delay-75 duration-300 transform">
            <div className="flex">
              <button
                className={`w-full flex items-center gap-2 text-left py-2 px-4 focus:outline-none `}
                
              >
                <img src="/icons/products.svg" alt="" />
                Products
              </button>
              <img className="w-10" src="/icons/down.svg" alt="" />
            </div>
            <div
              className={`pl-4  ${
                activeAccordion === "products"
                  ? "max-h-full translate-y-0"
                  : "max-h-0 -translate-y-8 overflow-hidden"
              } transition-transform`}
            >
              <Link to={"admin/all-products"} className="block py-2 px-10 ">
                All products
              </Link>
              <Link to={"admin/add-new-product"} className="block py-2 pl-10 ">
                Add a new product
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <Link
              to={"admin/all-users"}
              className={`w-full flex items-center gap-2 text-left py-2 px-4 focus:outline-none `}
            >
              <img src="/icons/users.svg" alt="" />
              Users
            </Link>
          </div>
          <div className="mb-4">
            <Link
              to={""}
              className={`w-full flex items-center gap-2 text-left py-2 px-4 focus:outline-none `}
            >
              <img src="/icons/transactions.svg" alt="" />
              Transactions
            </Link>
          </div>
          <div className="mb-4">
            <Link
              to={"admin/reviews"}
              className={`w-full  flex items-center gap-2 text-left py-2 px-4 focus:outline-none `}
            >
              <img src="/icons/reviews.svg" alt="" />
              Reviews
            </Link>
          </div>
          <div onClick={() => toggleAccordion("coupons")} className="mb-4 transition-all ease-in-out delay-75 duration-300 transform">
            <div className="flex">
              <button
                className={`w-full flex items-center gap-2 text-left py-2 px-4 focus:outline-none `}
                
              >
                <img src="/icons/products.svg" alt="" />
                Coupons
              </button>
              <img className="w-10" src="/icons/down.svg" alt="" />
            </div>
            <div
              className={`pl-4  ${
                activeAccordion === "coupons"
                  ? "max-h-full translate-y-0"
                  : "max-h-0 -translate-y-8 overflow-hidden"
              } transition-transform`}
            >
              <Link to={"admin/coupons"} className="block py-2 px-10 ">
                All coupons
              </Link>
              <Link to={"admin/create-coupon"} className="block py-2 pl-10 ">
                Add a new coupon
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white border-b p-4 flex flex-row-reverse">
          <nav className="flex">
            <ul className="flex flex-row items-center gap-4 pr-6">
              <li>
                <Link to={"/dashboard/admin/notifications"}>
                  <img src="/icons/notifications.svg" alt="" />
                </Link>
              </li>
              <li>
                <Link to={""}>
                  <img src="/icons/chat.svg" alt="" />
                </Link>
              </li>
              {user&&<li>
                <img className="w-6" src={user.profilePicture} alt="" />
              </li>}
            </ul>
            {user && (
              <span>
                <button
                  onClick={handleLogout}
                  className="bg-teal-500 text-white py-1 px-2 hover:opacity-95 rounded-lg"
                >
                  Logout
                </button>
              </span>
            )}
          </nav>
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
