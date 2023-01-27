import { createBrowserRouter } from "react-router-dom";
import LayoutWrapper from "../common/wrapper/LayoutWrapper";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Cart from "../pages/cart/Cart";
import Homepage from "../pages/home/Homepage";
import Products from "../pages/product/Products";
import SearchResults from "../pages/search/SearchResults";
import ProductDetails from "../pages/product/ProductDetails";
import Profile from "../pages/profile/Profile";
import AdminWrapper from "../common/wrapper/AdminWrapper";
import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import UserLists from "../pages/admin/UserLists";
import Specs from "../pages/admin/Specs";
import AddProducts from "../pages/admin/AddProducts";
import EditProduct from "../pages/admin/EditProduct";
import Contact from "../pages/page/Contact";
import CustomeService from "../pages/page/CustomeService";
import About from "../pages/page/About";
import ProductsByCategory from "../pages/product/ProductsByCategory";
import UsersChat from "../pages/admin/UsersChat";
import SocketProvider from "../context/SocketContext";
import AdminSocketProvider from "../context/AdminSocketContext";
import Faq from "../pages/Links/Faq";
import PrivacyPolicy from "../pages/Links/PrivacyPolicy";
import ReturnPolicy from "../pages/Links/ReturnPolicy";
import Faqs from "../pages/admin/Faqs";
import Offer from "../pages/admin/Offer";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import Review from "../pages/product/Review";
import Shop from "../pages/product/Shop";
import BuyProducts from "../pages/admin/BuyProducts";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product",
        element: <ProductDetails />,
      },
      {
        path: "/productsbycategory",
        element: <ProductsByCategory />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/customerservice",
        element: <SocketProvider />,
        children: [
          {
            path: "/customerservice",
            element: <CustomeService />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/returnpolicy",
        element: <ReturnPolicy />,
      },
      {
        path:"/review",
        element:<Review/>
      },
      {
        path:"/shop",
        element:<Shop/>
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminWrapper />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/products",
        element: <AdminProducts />,
      },
      {
        path: "/admin/users",
        element: <UserLists />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
      {
        path: "/admin/specs",
        element: <Specs />,
      },
      {
        path: "/admin/addproduct",
        element: <AddProducts />,
      },
      {
        path: "/admin/editproduct",
        element: <EditProduct />,
      },
      {
        path: "/admin/buy",
        element: <BuyProducts />,
      },
      {
        path: "/admin/customercare",
        element: <AdminSocketProvider />,
        children: [
          {
            path: "/admin/customercare",
            element: <UsersChat />,
          },
        ],
      },
      {
        path:"/admin/faq",
        element:<Faqs/>
      },
      {
        path:"/admin/offer",
        element:<Offer/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/forgetpassword",
    element:<ForgetPassword/>
  },
  {
    path:"/changepassword",
    element:<ChangePassword/>
  }
]);
