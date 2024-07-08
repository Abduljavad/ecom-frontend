import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Url } from "../../url";

function DiscountCoupons() {
  const [coupons, setCoupons] = useState([]);

    useEffect(() => {

      axios
        .get(Url+"/coupons")
        .then((response) => {
          setCoupons(response.data);
          
        })
        .catch((error) => {
          console.error("Error fetching coupons:", error);
        });
    }, []);
  
    const handleDelete = async (couponId) => {
      try {

        await axios.delete(Url+"/coupons/"+couponId);
  

        setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== couponId));
        toast.success("Coupon successfully deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log(`Coupon with ID ${couponId} deleted successfully`);
      } catch (error) {
        console.error("Error deleting coupon:", error);
      }
    };
    console.log(coupons);
    return (
      <main className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">All Coupons</h1>
        <table className="min-w-full bg-white rounded-2xl shadow-lg font-semibold">
          <thead className="bg-teal-400 rounded-2xl">
            <tr>
              <th className="py-5 px-4 border-b">Coupon Name</th>
              <th className="py-5 px-4 border-b">Coupon Code</th>
              <th className="py-5 px-4 border-b">Expires In</th>
              <th className="py-5 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="border-b text-center">

                <td className="py-8 px-4 w-2/5">{coupon.couponName}</td>
                <td>{coupon.couponCode}</td>
                <td>{new Date(coupon.expiresIn).toLocaleString()}</td>
  
                <td className="py-8 px-4">
                  <button
                    onClick={() => handleDelete(coupon._id)}
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
  )
}

export default DiscountCoupons