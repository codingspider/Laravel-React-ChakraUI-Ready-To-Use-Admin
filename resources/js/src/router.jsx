import { createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Welcome from "./components/pages/Welcome";
import Unauthorized from "./components/auth/Unauthorized";
import Forgot from "./components/auth/Forgot";
import ResetPassword from "./components/auth/ResetPassword";
import MainLayout from "./components/layouts/MainLayout";
import ErrorPage from "./components/pages/ErrorPage";

import { superAdminRoutes } from "./routes/superAdminRoutes";
import { SUPER_ADMIN_BASE, LOGIN, ROOT, UNAUTHORIZED, FORGOT, RESET_PASSWORD } from "./routes/commonRoutes";

const router = createBrowserRouter([
  { path: LOGIN, element: <Login /> },
  { path: ROOT, element: <Welcome /> },
  { path: UNAUTHORIZED, element: <Unauthorized /> },
  { path: FORGOT, element: <Forgot /> },
  { path: RESET_PASSWORD, element: <ResetPassword /> },

  // SUPER ADMIN ROUTES
  {
    path: SUPER_ADMIN_BASE,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: superAdminRoutes,
  },
]);

export default router;
