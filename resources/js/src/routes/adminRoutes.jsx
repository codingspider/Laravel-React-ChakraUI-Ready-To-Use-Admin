import ProtectedRoute from "../ProtectedRoute";
import AdminDashboard from "../components/admin/dashboard/Dashboard";
import { ADMIN_BASE } from "./commonRoutes";

import BranchList from "../components/admin/branch/BranchList";
import BranchCreate from './../components/admin/branch/BranchCreate';
import BranchEdit from './../components/admin/branch/BranchEdit';

import General from "../components/admin/general/General";


export const BRANCH_LIST = "branch/list";
export const BRANCH_ADD = "branch/create";
export const BRANCH_EDIT = "branch/edit/:id";

export const BRANCH_LIST_PATH = `${ADMIN_BASE}/branch/list`;
export const BRANCH_ADD_PATH = `${ADMIN_BASE}/branch/create`;
export const BRANCH_EDIT_PATH = (id) => `${ADMIN_BASE}/branch/edit/${id}`;


export const ADMIN_DASHBOARD_PATH = `${ADMIN_BASE}/dashboard`;
export const GENERAL_PAGE_PATH = `${ADMIN_BASE}/general`;

export const adminRoutes = [
    { path: ADMIN_DASHBOARD_PATH, element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute> },
    { path: GENERAL_PAGE_PATH, element: <ProtectedRoute role="admin"><General /></ProtectedRoute> },

    { path: BRANCH_LIST_PATH, element: <ProtectedRoute role="admin"><BranchList /></ProtectedRoute> },
    { path: BRANCH_ADD_PATH, element: <ProtectedRoute role="admin"><BranchCreate /></ProtectedRoute> },
    { path: BRANCH_EDIT, element: <ProtectedRoute role="admin"><BranchEdit /></ProtectedRoute> },
];
