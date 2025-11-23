import ProtectedRoute from "../ProtectedRoute";
import AdminDashboard from "../components/admin/Dashboard";

export const adminRoutes = [
    { path: "dashboard", element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute> },
];
