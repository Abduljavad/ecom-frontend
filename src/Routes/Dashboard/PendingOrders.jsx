import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../url";

function PendingOrders() {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    axios
      .get(Url+"/orders")
      .then((res) => {
        const pending = res.data.filter(
          (order) => order.orderStatus === "pending"
        );
        setPendingOrders(pending);
      })
      .catch((error) => {
        console.error("Error fetching pending orders:", error);
      });
  }, []);

  return (
    <>
    {pendingOrders.length > 0?<main className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
      <table className="min-w-full bg-white shadow-lg rounded-2xl font-semibold ">
        <thead className="bg-teal-400 rounded-2xl">
          <tr>
            <th className="py-5 px-4 border-b">Order ID</th>
            <th className="py-5 px-4 border-b">Time of Order</th>
            <th className="py-5 px-4 border-b">User</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrders.map((order) => (
            <tr key={order._id} className="border-b text-center">
              <td className="py-8 px-4">{order._id}</td>
              <td className="py-8 px-4">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="py-8 px-4">{order.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>:
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold font-mono">There is no pending orders</h1>
    </main>
    }
    </>
  );
}

export default PendingOrders;
