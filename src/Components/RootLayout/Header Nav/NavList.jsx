import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavList() {
  const user = useSelector((state) => state.auth.user);
  return (
    <ul className="flex flex-col items-center  gap-8 font-semibold  py-12 w-full lg:flex lg:flex-row lg:gap-10">
      <li className="hover:text-rose-500">
        <Link to={""}>Home</Link>
      </li>
      <li className="hover:text-rose-500">
        <Link to={"/categories"}>Categories</Link>
      </li>
      <li className="hover:text-rose-500">
        {user ? (
          <Link to={"/orders/" + user._id}>My Orders</Link>
        ) : (
          <Link to={'/login'}>My Orders</Link>
        )}
      </li>
      <li className="hover:text-rose-500">
        <Link to={""}>Help</Link>
      </li>
    </ul>
  );
}

export default NavList;
