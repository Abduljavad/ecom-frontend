import { useEffect, useState } from "react";
import ChartComponent from "../../Components/Chart/Chart";
import axios from "axios";
import { Url } from "../../url";


function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    
    axios
      .get(Url+"/users")
      .then((response) => {
        setUsers(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
      axios
      .get(Url+"/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
      
  }, [])
  return (
    <main className="flex-1 overflow-x-hidden w-full overflow-y-auto bg-gray-200 p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total Products</h2>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
            <p className="text-3xl font-bold">$50,000</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md mt-10 w-4/5">
          <h2 className="text-lg font-semibold mb-2">Sales Chart</h2>
          <ChartComponent />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
