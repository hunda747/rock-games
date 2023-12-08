import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import CampaignPage from "./pages/CampaignPage";
import DetailCampaignPage from "./pages/DetailCampaignPage";
import UserAuth from "./hooks/userAut";
import FundingCampaignPage from "./pages/fundingCampaignsPage";
import ManageShopOwner from "./pages/Manage/ManageShopOwner";
import RetailReport from "./pages/Report/RetailReport";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <RetailReport /> },
        { path: "manageShopOwner", element: <ManageShopOwner /> },
        { path: "user", element: <UserPage /> },
        { path: "campaign", element: <CampaignPage /> },
        { path: "fundingCampaign", element: <FundingCampaignPage /> },
        { path: "detail", element: <DetailCampaignPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <UserPage /> },
      ],
    },
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/login" />, index: true },
    //     { path: "404", element: <Page404 /> },
    //     { path: "*", element: <Navigate to="/404" /> },
    //   ],
    // },
    // {
    //   element: <UserAuth />,
    //   children: [
    //     { element: <Navigate to="/login" />, index: true },
    //     { path: "404", element: <Page404 /> },
    //     { path: "*", element: <Navigate to="/404" /> },
    //   ],
    // },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
