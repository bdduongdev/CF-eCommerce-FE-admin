import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Orders from "../pages/orders/orders";
import Inventory from "../pages/inventory/Inventory";

import AddProductPage from "../pages/inventory/add-product";
import CategoriesPage from "../pages/category/categories";
import AddCategoryPage from "../pages/category/add";
import UsersPage from "../pages/users/Users";
import AddUserPage from "../pages/users/AddUser";
import EditCategory from "../pages/category/EditCategory";

import EditProductPage from "../pages/inventory/EditProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "orders", element: <Orders /> },
      
      { path: "inventory", element: <Inventory /> },
      { path: "inventory/create", element: <AddProductPage /> },
      { path: "inventory/edit/:id", element: <EditProductPage /> },
      { path: "category", element: <CategoriesPage /> },
      { path: "category/create", element: <AddCategoryPage /> },
      { path: "category/edit/:id", element: <EditCategory /> },
      { path: "users", element: <UsersPage /> },
      { path: "users/add", element: <AddUserPage /> },
      { path: "about", element: <div>About</div> },
    ],
  },

]);
