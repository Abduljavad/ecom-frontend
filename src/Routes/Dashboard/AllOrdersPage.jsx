import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../../url";

function AllOrdersPage() {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  useEffect(() => {
    axios
      .get(Url+"/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(Url+ "/orders/" + orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      toast.success("Order successfully deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  console.log(orders);
  const handleUpdateStatus = async (orderId, currentStatus) => {
    try {
      let newStatus;

      if (currentStatus === "pending") {
        newStatus = "Shipped";
      } else if (currentStatus === "Shipped") {
        newStatus = "Out for delivery";
      } else if (currentStatus === "Out for delivery") {
        newStatus = "Delivered";
      } else {
        newStatus = currentStatus;
      }

      const updatedOrder = await axios.patch(
        Url+"/orders/"+orderId,
        { orderStatus: newStatus }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: updatedOrder.data.orderStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  return (
    <main className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-8 ml-4 ">All Orders</h1>
      <table className="min-w-full rounded-2xl font-semibold bg-white shadow-lg">
        <thead className="bg-teal-400 rounded-2xl">
          <tr>
            <th className="py-5 px-4 border-b">Order ID</th>
            <th className="py-5 px-4 border-b">Time of order</th>
            <th className="py-5 px-4 border-b">User</th>
            <th className="py-5 px-4 border-b">Status</th>
            <th className="py-5 px-4 border-b">Delete Order</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b ">
              <td className="py-8 px-4 text-center">{order._id}</td>
              <td className="py-8 px-4 text-center">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              {order.user && (
                <td className="py-8 px-4 text-center">{order.user.email}</td>
              )}
              <td className="py-8 px-4 text-center">
                <button
                  onClick={() =>
                    handleUpdateStatus(order._id, order.orderStatus)
                  }
                  className={`px-4 py-2 ${
                    order.orderStatus === "Shipped"
                      ? "bg-yellow-400"
                      : order.orderStatus === "Out for delivery"
                      ? "bg-blue-400"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-200"
                      : "bg-gray-200"
                  }`}
                >
                  {order.orderStatus}
                </button>
              </td>
              <td className="py-8 px-4 text-center">
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="bg-red-600 rounded  px-4 py-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default AllOrdersPage;
