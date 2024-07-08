import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Footer({isDarkMode}) {
  return (
    // <footer className="flex flex-col gap-6 p-4 mt-24 ">

    //   <div>
    //     <ul className="flex flex-row justify-center gap-4 ">
    //       <li>
    //         <Link to={""}>
    //           <img
    //             className="w-8 h-8"
    //             src="/images/insta.png"
    //             alt="instagram logo"
    //           />
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to={""}>
    //           <img className="w-8 h-8" src="/images/X.png" alt="X logo" />
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to={""}>
    //           <img
    //             className="w-8 h-8"
    //             src="/images/fb.png"
    //             alt="Facebook logo"
    //           />
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="flex flex-row justify-center items-center">
    //     <Link to={""}>
    //       {" "}
    //       <img className="h-12 " src="/images/playstore.png" alt="" />
    //     </Link>
    //     <Link to={""}>
    //       {" "}
    //       <img className="h-11" src="/images/appstore.png" alt="" />
    //     </Link>
    //   </div>
    //   <h3 className="font-bold text-3xl text-center">UNIQUE</h3>
    //   <span className="text-center">
    //     Unique Mens fashion, 119 Marylebone Road, India. Copyright © UNIQUE
    //     (INDIA) LIMITED. All rights reserved
    //   </span>
    //   <img
    //     className="w-1/4 self-center"
    //     src="/images/transactions.png"
    //     alt=""
    //   />
    // </footer>
    <footer className={`relative   ${isDarkMode ? 'bg-black text-white' : ' bg-blue-100 text-black'} pt-8 pb-6 mt-20`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-blueGray-700">
            AstralMens
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                
              >
                <img className="w-8 mx-auto" src="/images/insta.png" alt="" />
              </button>
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                
              >
                <img className="w-8 mx-auto" src="/images/fb.png" alt="" />

              </button>
              <button
                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                
              >
                <img className="w-8 mx-auto" src="/images/X.png" alt="" />

              </button>
              
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    >
                      Blog
                    </Link>
                  </li>
                
                  
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                 
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024  </span>
              <Link
                className="text-blueGray-500 hover:text-blueGray-800"
              >
                AstralMens
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
Footer.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};
export default Footer;
