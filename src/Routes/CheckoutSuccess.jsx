import { Link } from "react-router-dom";

function CheckoutSuccess() {
  return (
    <main className="container mx-auto flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-3xl md:text-5xl text-green-600 text-center">Your order placed successfully</h2>
        <img src="/images/success.png"  className="h-full " alt="" />
        <p className="text-2xl text-yellow-500">
          {" "}
          
        </p>
        <Link to="/" className="underline dark:text-white text-slate-600 font-semibold">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default CheckoutSuccess;
