import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavList from "./Header Nav/NavList";
import axios from "axios";
import PropTypes from 'prop-types';
import { removeUser } from "../../Features/Auth/authSlice";
import { Url } from "../../url";

function Header({isDarkMode , toggleDarkMode}) {
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const count = useSelector((state) => state.allCart.carts);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(Url + "/users/logout", {}, { withCredentials: true })
      .then((data) => {
        console.log(data);
        dispatch(removeUser());
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  const handleProfileClick = (e) => {
    e.preventDefault();

    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div
        className={`fixed lg:hidden top-0 right-0 w-9/12 md:w-9/12 h-full z-10 ${
          drawerVisible ? "translate-x-0" : "translate-x-full"
        } transition-all duration-300 flex flex-col justify-start items-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-slate-200 text-black'}`}
      >
        <div className="shadow-lg">
          <button
            className="absolute top-4 right-4 h-6 w-6"
            onClick={() => {
              setDrawerVisible(false);
            }}
          >
            <img src="/icons/Close.svg" alt="" />
          </button>
        </div>
        <div className="block sm:hidden flex flex-row place-self-start py-4 px-4">
          <img className="h-16" src="/images/Unique.png" alt="Logo" />
          <div>
            <h3 className="font-bold">AstralMens</h3>
            {/* <span className="font-semibold">Mens Fashion</span> */}
          </div>
        </div>
        <nav>
          <NavList />
        </nav>
      </div>

      <header className={`flex flex-row justify-between items-center h-16 px-4 shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-slate-200 text-black'}  `}>
        <Link className=" flex flex-row items-center ">
          <img className="h-14" src="/images/Unique.png" alt="Logo" />
          <div>
            <h3 className="font-semibold text-2xl">AstralMens</h3>
            {/* <span className="font-semibold">Mens Fashion</span> */}
          </div>
        </Link>
        <nav className=" hidden lg:block">
          <NavList />
        </nav>
        
        <div className="flex items-center gap-2">
        <button 
          onClick={toggleDarkMode}
          className={`p-1 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded`}>
          <img className="h-6 w-6" src="/icons/theme.svg" alt="theme" />
        </button>
          <Link to={user ? "/cart" : "/login"} className="flex items-center">
            <img className="h-6 w-6" src="/icons/Cart.svg" alt="cart" />
            <span className="text-xs text-white bg-red-500 rounded-full w-4 text-center font-semibold">
              {count ? count.length : 0}
            </span>
          </Link>
          {!user ? (
            <Link
              className="flex gap-1  bg-teal-500 text-white py-1 px-2 hover:opacity-95 rounded-lg"
              to={"/login"}
            >
              <span className="font-semibold text-sm uppercase" alt="Login">
                Login
              </span>
            </Link>
          ) : (
            <div className=" flex flex-row items-center gap-4">
              {" "}
              {user && (
                <Link onClick={handleProfileClick}>
                  <img
                    className="w-8 h-8 rounded-full dark:bg-white object-cover"
                    src={user.profilePicture}
                    alt="profile"
                  />
                </Link>
              )}
              {dropdownVisible && (
                <div
                  className={`absolute top-12 right-6 bg-white shadow-lg rounded-lg py-2 mt-1 `}
                >
                  <Link
                    to={"/profile/" + user._id}
                    onClick={() => setDropdownVisible(false)}
                    className="block px-4 py-2 font-semibold text-teal-500"
                  >
                    Profile
                  </Link>
                  <hr />
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 text-teal-500 font-semibold  cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            className="lg:hidden"
            onClick={() => {
              setDrawerVisible(true);
            }}
          >
            <img className="h-6 w-6" src="/icons/Menu.svg" alt="" />
          </button>
        </div>
      </header>
    </>
  );
}
Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};
export default Header;
