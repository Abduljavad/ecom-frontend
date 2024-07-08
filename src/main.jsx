import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./App/store";
import "./index.css";
import RootLayout from "./Layouts/RootLayout";
import ErrorPage from "./Routes/ErrorPage.Jsx";
import SignupPage from "./Routes/SignupPage";
import HomePage, { loader as homepageLoader } from "./Routes/HomePage";
import LoginPage from "./Routes/LoginPage";
import CategoriesPage, {
  loader as categoriesLoader,
} from "./Routes/CategoriesPage";
import ProductsByCategoriespage, {
  loader as productsByCategoryLoader,
} from "./Routes/productsByCategoriespage";
import ProductPage, { loader as productPageLoader } from "./Routes/ProductPage";
import { Provider } from "react-redux";
import CartPage from "./Routes/CartPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Checkout from "./Routes/Checkout";
import CheckoutSuccess from "./Routes/CheckoutSuccess";
import CheckoutCancel from "./Routes/CheckoutCancel";
import OrdersPage, { loader as orderLoader } from "./Routes/OrdersPage";
import DashBoardLayout from "./Layouts/DashBoardLayout";
import Dashboard from "./Routes/Dashboard/Dashboard";
import AllOrdersPage from "./Routes/Dashboard/AllOrdersPage";
import CompletedOrders from "./Routes/Dashboard/CompletedOrders";
import PendingOrders from "./Routes/Dashboard/PendingOrders";
import AllCategories from "./Routes/Dashboard/AllCategories";
import AddNewCategory from "./Routes/Dashboard/AddNewCategory";
import AllProducts from "./Routes/Dashboard/AllProducts";
import AddNewProduct from "./Routes/Dashboard/AddNewProduct";
import UsersPage from "./Routes/Dashboard/UsersPage";
import ReviewsPage from "./Routes/Dashboard/ReviewsPage";
import DiscountCoupons from "./Routes/Dashboard/DiscountCoupons";
import CreateCoupon from "./Routes/Dashboard/AddNewCoupon";
import ProfilePage from "./Routes/ProfilePage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import NotificationsPage from "./Routes/Dashboard/NotificationsPage";

let persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: homepageLoader,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
        loader: categoriesLoader,
      },
      {
        path: "/products/:categoryId",
        element: <ProductsByCategoriespage />,
        loader: productsByCategoryLoader,
      },
      {
        path: "/products/item/:productId",
        element: <ProductPage />,
        loader: productPageLoader,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout/:userId",
        element: <Checkout />,
      },
      {
        path: "/success",
        element: <CheckoutSuccess />,
      },
      {
        path: "/cancel",
        element: <CheckoutCancel />,
      },
      {
        path: "/orders/:userId",
        element: <OrdersPage />,
        loader: orderLoader,
      },
      {
        path: "/profile/:userId",
        element: <ProfilePage/>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashBoardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "admin/all-orders",
        element: <AllOrdersPage />,
      },
      { 
        path: "admin/completed-orders",
        element: <CompletedOrders />,
      },
      {
        path: "admin/pending-orders",
        element: <PendingOrders />,
      },
      {
        path: "admin/all-categories",
        element: <AllCategories />,
      },
      {
        path: "admin/add-new-category",
        element: <AddNewCategory />,
      },
      {
        path: "admin/all-products",
        element: <AllProducts />,
      },
      {
        path: "admin/add-new-product",
        element: <AddNewProduct />,
      },
      {
        path: "admin/all-users",
        element: <UsersPage />,
      },
      {
        path: "admin/reviews",
        element: <ReviewsPage/>
      },
      {
        path: "admin/coupons",
        element: <DiscountCoupons/>
      },
      {
        path: "admin/create-coupon",
        element: <CreateCoupon/>
      },
      {
        path : "admin/notifications",
        element : <NotificationsPage/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
