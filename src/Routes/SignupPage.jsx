import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import OAuth from "../Components/GoogleAuth/OAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../url";

let userSchema = object({
  userName: string().required(),
  email: string().email().required(),
  password: string().required(),
});
function SignupPage() {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const userName = form["userName"].value;
    const email = form["email"].value;
    const password = form["password"].value;

    try {
      await userSchema.validate({
        userName,
        password,
        email,
      });

      const response = await axios.post(Url+"/users/signup", {
        userName,
        password,
        email,
      });
  
      console.log(response.data);
      navigate("/login");
      toast.success("User created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.error(err);
  
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during signup");
      }
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col font-semibold shadow-xl px-5 md:px-20 xl:px-40 py-8 lg:w-6/12"
      >
        <h2 className="text-3xl text-center font-semibold my-12">Signup</h2>
        <div className="flex flex-col">
          <input
            className=" mb-6 p-3 mt-2 dark:text-black  bg-slate-100"
            type="text"
            id="userName"
            placeholder="UserName"
          />
        </div>
        <div className="flex flex-col">
          <input
            className=" mb-6 p-3 mt-2  dark:text-black bg-slate-100"
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col">
          <input
            className=" mb-6 p-3 mt-2 dark:text-black  bg-slate-100"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-slate-700 rounded uppercase hover:opacity-95 text-white "
        >
          Sign Up
        </button>
        {error&&<span className="mt-4 p-2 bg-red-200 text-red-800 rounded">
          {error}
        </span>}
        <div className="flex flex-row justify-center items-center m-12 ">
          <hr className="border-1 border-gray-400 w-full" />
          <span className="text-center  rounded-3xl p-2 border-2 border-gray-500">
            OR{" "}
          </span>
          <hr className="border-1 border-gray-400 w-full" />
        </div>
        <div className="flex flex-row items-center justify-center">
          <OAuth />
        </div>
        <span className=" self-center p-12">
          Already have an account.{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </span>
        
        
      </form>
    </main>
  );
}

export default SignupPage;
