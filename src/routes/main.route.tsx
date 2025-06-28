import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../components/layouts/MainLayout"

import Dashboard from "../pages/Dashboard"
import Orders from "../pages/orders/orders"
import Inventory from "../pages/inventory/Inventory"

import AddProductPage from "../pages/inventory/add-product"
import CategoriesPage from "../pages/category/categories"
import AddCategoryPage from "../pages/category/add"
import UsersPage from "../pages/users/Users"

import EditCategory from "../pages/category/EditCategory"
import EditProductPage from "../pages/inventory/EditProductPage"
import BannersPage from "../pages/banner/BannersPage"
import AddBannerPage from "../pages/banner/AddBannerPage"
import EditBannerPage from "../pages/banner/EditBannerPage"
import BannerRestorePage from "../pages/banner/BannerRestorePage"
import DiscountsPage from "../pages/discounts/DiscountsPage"
import AddDiscountPage from "../pages/discounts/AddDiscountPage"
import EditDiscountPage from "../pages/discounts/EditDiscountPage"
import RestoreCategoryPage from "../pages/category/RestoreCategoryPage"
import InventoryRestorePage from "../pages/inventory/InventoryRestorePage"
import AdminSignInPage from "../pages/auth/AdminSignInPage"
import ReviewsPage from "../pages/reviews/ReviewsPage"
import RequireAuth from "../components/auths/RequireAuth"

export const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <AdminSignInPage />, // Public
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "orders", element: <Orders /> },
      { path: "inventory", element: <Inventory /> },
      { path: "inventory/create", element: <AddProductPage /> },
      { path: "inventory/edit/:id", element: <EditProductPage /> },
      { path: "inventory/restore", element: <InventoryRestorePage /> },
      { path: "category", element: <CategoriesPage /> },
      { path: "category/create", element: <AddCategoryPage /> },
      { path: "category/edit/:id", element: <EditCategory /> },
      { path: "category/restore", element: <RestoreCategoryPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "banner", element: <BannersPage /> },
      { path: "banner/add", element: <AddBannerPage /> },
      { path: "banner/edit/:id", element: <EditBannerPage /> },
      { path: "banner/restore", element: <BannerRestorePage /> },
      { path: "discounts", element: <DiscountsPage /> },
      { path: "discounts/create", element: <AddDiscountPage /> },
      { path: "discounts/edit/:id", element: <EditDiscountPage /> },
      { path: "reviews", element: <ReviewsPage /> },
      { path: "about", element: <div>About</div> },
    ],
  },
])
