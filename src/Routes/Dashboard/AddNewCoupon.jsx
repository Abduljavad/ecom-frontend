import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../../url";

function CreateCoupon() {
  const navigate = useNavigate()
  const [couponData, setCouponData] = useState({
    couponName: "",
    couponCode: "",
    discountAmount: "",
    expiresIn: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      await axios.post(Url+"/coupons", couponData);
      toast.success("Coupon successfully added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/dashboard/admin/coupons')
      setCouponData({
        couponName: "",
        couponCode: "",
        discountAmount: "",
        expiresIn: "",
      });
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };

  return (
    <main className="container mx-auto my-8 flex flex-col  items-center">
      <div className="w-3/5 ">
        <h1 className="text-2xl font-bold mb-4">Add New Coupon</h1>
        <form
          onSubmit={handleCreateCoupon}
          className="flex flex-col gap-6 font-semibold ml-6 mt-12 shadow-lg p-4"
        >
          <label className="flex flex-col">
            Coupon Name:
            <input
              type="text"
              name="couponName"
              value={couponData.couponName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            Coupon Code:
            <input
              type="text"
              name="couponCode"
              value={couponData.couponCode}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            Discount Amount:
            <input
              type="number"
              name="discountAmount"
              value={couponData.discountAmount}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            Expires In:
            <input
              type="date"
              name="expiresIn"
              value={couponData.expiresIn}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-teal-400 text-white p-2 rounded-md hover:bg-teal-500 focus:outline-none focus:shadow-outline-teal active:bg-teal-600"
          >
            Create Coupon
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreateCoupon;
