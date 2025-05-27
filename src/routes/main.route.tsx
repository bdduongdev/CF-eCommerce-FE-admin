import { createBrowserRouter, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/orders/orders";
import Inventory from "../pages/inventory/Inventory";
import CreateOrder from "../pages/orders/CreateOrder";
import AddProductPage from "../pages/inventory/add-product";
import CategoriesPage from "../pages/category/categories";

import AddCategoryPage from "../pages/category/add";
import UsersPage from "../pages/users/Users";
import AddUserPage from "../pages/users/AddUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
    {
    path: "/Orders",
    element: <Orders />,
  },
  {
    path: "/Orders/create",
    element: <CreateOrder />,
  },
  ///
     {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/inventory/create",
    element: <AddProductPage />,
  },
  //
  {
    path: "/category",
    element: <CategoriesPage />,
  },
  
  {
    path: "/category/create",
    element: <AddCategoryPage />,
  },
    {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/users/add",
    element: <AddUserPage />,
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
]);
