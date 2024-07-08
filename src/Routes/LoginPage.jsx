import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../Features/Auth/authSlice";
import OAuth from "../Components/GoogleAuth/OAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../url";

let userSchema = object({
  email: string().email().required(),
  password: string().required(),
});
function LoginPage() {

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form["email"].value;
    const password = form["password"].value;

    try {
      await userSchema.validate({
        password,
        email,
      });
  
      const response = await axios.post(
        Url+"/users/login",
        { password, email },
        { withCredentials: true }
      );
  
      if (response.data.currentUser) {
        const user = response.data.currentUser;
        dispatch(addUser(user));
  
        if (user.admin === true) {
          navigate("/dashboard");
          toast.success(`Welcome back, ${user.userName}!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          navigate("/categories");
          toast.success(`Welcome back, ${user.userName}!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        setError("Incorrect Password or Email");
      }
    } catch (error) {
      console.error(error);
  
      (async () => {
        if (error.response && error.response.data) {
          setError(error.response.data.error || "An error occurred");
        } else {
          setError("An error occurred");
        }
      })();
    }
  }
  

  return (
    <main className="flex flex-col justify-center items-center relative">
      <form
        type="submit"
        onSubmit={handleSubmit}
        className="flex flex-col font-semibold shadow-xl px-5  lg:px-40 py-8 lg:w-6/12"
      >
        <h2 className="text-center text-3xl my-12 font-semibold">Login</h2>
        <div className="flex flex-col">
          <input
            className=" mb-6 p-3 mt-2 dark:text-black bg-slate-100"
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col">
          <input
            className=" mb-6 p-3 mt-2 dark:text-black bg-slate-100"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-slate-700 rounded text-white hover:opacity-95"
        >
          Login
        </button>
        {error&&<span className="mt-4 p-2 bg-red-200 text-red-800 rounded">
          {error}!
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
        <span className="self-center p-12">
          Dont have an account?.{" "}
          <Link to={"/signup"} className="text-blue-600">
            SignUp
          </Link>
        </span>
        
      </form>
    </main>
  );
}

export default LoginPage;
