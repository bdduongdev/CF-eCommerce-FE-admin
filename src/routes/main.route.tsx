import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/inventory/inventory";
import AddProductPage from "../pages/inventory/add-product";
import Orders from "../pages/Orders/Orders";
import CreateOrder from "../pages/Orders/CreateOrder";
// import EditProductPage from "../pages/inventory/EditProductPage";
import CategoriesPage from "../pages/category/categories";
import AddCategoryPage from "../pages/category/add";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  //đơn hàng
    {
    path: "/Orders",
    element: <Orders />,
  },
   {
    path: "/Orders/create",
    element: <CreateOrder />,
  },
  // {
  //   path: "/Orders/edit/:id",
  //   element: <EditProductPage />,
  // },
  //products
     {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/inventory/add",
    element: <AddProductPage />,
  },
//danh mục
  {
    path: "category",
    element: <CategoriesPage/>
  },
   {
    path: "category/add",
    element: <AddCategoryPage/>
  },
  // {
  //   path: "/about",
  //   element: <div>About</div>,
  // },
]);
