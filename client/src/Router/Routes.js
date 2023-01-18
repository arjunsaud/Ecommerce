import { createBrowserRouter } from "react-router-dom";
import LayoutWrapper from "../common/wrapper/LayoutWrapper";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Cart from "../pages/cart/Cart";
import Homepage from "../pages/home/Homepage";
import Products from "../pages/product/Products";
import SearchResults from "../pages/search/SearchResults";
import ProductDetails from "../pages/product/ProductDetails"
import Profile from "../pages/profile/Profile";
import AdminWrapper from "../common/wrapper/AdminWrapper";
import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import UserLists from "../pages/admin/UserLists";
import AdminProfile from "../pages/admin/AdminProfile";
import Specs from "../pages/admin/Specs";
import AddProducts from "../pages/admin/AddProducts";
import EditProduct from "../pages/admin/EditProduct"
import Contact from "../pages/page/Contact";
import CustomeService from "../pages/page/CustomeService";
import About from "../pages/page/About";
import ProductsByCategory from "../pages/product/ProductsByCategory";
import UsersChat from "../pages/admin/UsersChat"

export const Router = createBrowserRouter([
  {
    path:"/",
    element:<LayoutWrapper/>,
    children:[
        {
            path:"/",
            element:<Homepage/>
        },
        {
          path:"/products",
          element:<Products/>
        },
        {
          path:"/product",
          element:<ProductDetails/>
        },
        {
          path:"/productsbycategory",
          element:<ProductsByCategory/>
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/search",
          element:<SearchResults/>
        },
        {
          path:"/profile",
          element:<Profile/>
        },
        {
          path:"/contact",
          element:<Contact/>
        },
        {
          path:"/customerservice",
          element:<CustomeService/>
        },
        {
          path:"/about",
          element:<About/>
        }
    ]
  },
  {
    path:"/admin",
    element:<AdminWrapper/>,
    children:[
      {
        path:"/admin",
        element:<Dashboard/>
      },
      {
        path:"/admin/products",
        element:<AdminProducts/>
      },
      {
        path:"/admin/users",
        element:<UserLists/>
      },
      {
        path:"/admin/profile",
        element:<AdminProfile/>
      },
      {
        path:"/admin/specs",
        element:<Specs/>
      },
      {
        path:"/admin/addproduct",
        element:<AddProducts/>
      },
      {
        path:"/admin/editproduct",
        element:<EditProduct/>
      },
      {
        path:"/admin/customercare",
        element:<UsersChat/>
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  }
]);
