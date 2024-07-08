import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../url";

function CompletedOrders() {
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    axios
      .get(Url+"/orders")
      .then((res) => {
        const completed = res.data.filter(
          (order) => order.orderStatus === "Delivered"
        );
        setCompletedOrders(completed);
      })
      .catch((error) => {
        console.error("Error fetching completed orders:", error);
      });
  }, []);

  return (
    <main className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Completed Orders</h1>
      <table className="min-w-full bg-white rounded-2xl shadow-lg font-semibold">
        <thead className="bg-teal-400 rounded-2xl">
          <tr>
            <th className="py-5 px-4 border-b">Order ID</th>
            <th className="py-5 px-4 border-b">Time of Order</th>
            <th className="py-5 px-4 border-b">Time of completion</th>
            <th className="py-5 px-4 border-b">User</th>
          </tr>
        </thead>
        <tbody>
          {completedOrders.map((order) => (
            <tr key={order._id} className="border-b text-center">
              <td className="py-8 px-4">{order._id}</td>
              <td className="py-8 px-4">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="py-8 px-4">
                {new Date(order.updatedAt).toLocaleString()}
              </td>

              <td className="py-8 px-4">{order.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default CompletedOrders;
