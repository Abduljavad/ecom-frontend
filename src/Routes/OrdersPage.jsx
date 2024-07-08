import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { Url } from "../url";


export async function loader({ params }) {
  const res = await axios.get(
    Url+"/orders/user/" + params.userId
  );
  const orders = res.data;
  console.log(orders);

  return { orders };
}

function OrdersPage() {
  const user = useSelector(state=> state.auth.user)
  const [review, setReview] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState("")
  const handleRateNowClick = (orderId) => {
    if(selectedOrder){
      setSelectedOrder(null)
    } else {
      setSelectedOrder(orderId)
    }
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e)=>{
    setRating(e.target.value)
  }

  const handleSubmitReview = async (productId) => {
    try {
      const response = await axios.post(Url+'/reviews', {
        product : productId,
        rating : parseInt(rating),
        content : review,
        author : user.userName
      });

  
      console.log('Review submitted successfully:', response.data);
      toast.success("Review added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
 
      setReview('');
      setSelectedOrder(null)
    } catch (error) {
      console.error('Error submitting review:', error);
   
    }
  };
  const { orders } = useLoaderData();

  return (
    <main className="container mx-auto mb-36">
      <div className="mt-20">
        <h2 className="text-3xl font-semibold mb-8">My Orders</h2>
        <hr />
        {orders.map((order) => (
          <div key={order._id} className="border p-4 flex flex-col">
            <h3 className="font-semibold text-slate-500">
              Order ID : {order._id}
            </h3>
            <ul className="pl-6 pt-4">
              {order.products.map((product) => (
                <li
                  key={product._id}
                  
                >
                  <div className="font-semibold flex flex-row justify-between items-center gap-4 mb-4"> 
                  <div className="flex flex-row items-center gap-3">
                    <img
                      src={Url+product.image}
                      className="w-8 h-8 object-cover"
                      alt=""
                    />
                    <span>{product.title} </span>
                  </div>
                  <div className="flex flex-row items-center gap-24">
                    <span className="text-md text-slate-700">
                      {order.orderStatus}
                    </span>
                    <span className="text-sm text-slate-400">
                      {dayjs(order.createdAt).format("MMM DD YYYY")}
                    </span>
                  </div>
                  </div>
                  {order.orderStatus === "Delivered" &&<button onClick={()=>handleRateNowClick(order._id)} className="font-semibold bg-green-600 px-4 py-1 text-white rounded">
                    Rate Now
                  </button>}
                  {selectedOrder === order._id  && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitReview(product._id);
                      }}
                    >
                      <select
                        onChange={handleRatingChange}
                        value={rating}
                        className="bg-yellow-400 mt-4 font-semibold  rounded py-1 px-2"
                        name="rating"
                        id="rating"
                      >
                        <option value="" disabled>Select Rating</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
                      <textarea
                        value={review}
                        onChange={handleReviewChange}
                        className="mt-4 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Write your review..."
                      ></textarea>
                      <button
                        type="submit"
                        className="mt-2 font-semibold bg-blue-600 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}

export default OrdersPage;
