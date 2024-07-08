import { Link } from "react-router-dom";

function CheckoutCancel() {
  return (
    <main className="container mx-auto flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-5xl text-red-600">Something went wrong</h2>
        <img src="/images/cancel.png" className="w-24" alt="" />
        <p className="text-2xl text-yellow-600">
          Please try again after sometime
        </p>
        <Link to="/" className="underline text-slate-600 font-semibold">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default CheckoutCancel;
