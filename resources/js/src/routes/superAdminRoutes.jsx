import ProtectedRoute from "../ProtectedRoute";
import Dashboard from "../components/superadmin/Dashboard";
import MasterSetting from "../components/superadmin/MasterSetting";
import SaveOrder from "../components/order/SaveOrder";
import UserList from "../components/user/UserList";
import UserCreate from "../components/user/UserCreate";
import PlanList from "../components/superadmin/plan/PlanList";

import { DASHBOARD, SUPER_ADMIN_BASE } from "./commonRoutes";


export const USER_LIST = "user/list";
export const USER_ADD = "user/create";
export const USER_EDIT = "user/edit/:id";

export const USER_LIST_PATH = `${SUPER_ADMIN_BASE}/user/list`;
export const USER_ADD_PATH = `${SUPER_ADMIN_BASE}/user/create`;
export const USER_EDIT_PATH = (id) => `${SUPER_ADMIN_BASE}/user/edit/${id}`;

export const PLAN_LIST = "plan/list";
export const PLAN_ADD = "plan/create";
export const PLAN_EDIT = "plan/edit/:id";

export const PLAN_LIST_PATH = `${SUPER_ADMIN_BASE}/plan/list`;
export const PLAN_ADD_PATH = `${SUPER_ADMIN_BASE}/plan/create`;
export const PLAN_EDIT_PATH = (id) => `${SUPER_ADMIN_BASE}/plan/edit/${id}`;

export const superAdminRoutes = [
    { path: DASHBOARD, element: <ProtectedRoute role="superadmin"><Dashboard /></ProtectedRoute> },
    { path: "settings", element: <ProtectedRoute role="superadmin"><MasterSetting /></ProtectedRoute> },
    { path: "save/order", element: <ProtectedRoute role="superadmin"><SaveOrder /></ProtectedRoute> },

    { path: USER_LIST_PATH, element: <ProtectedRoute role="superadmin"><UserList /></ProtectedRoute> },
    { path: USER_ADD_PATH, element: <ProtectedRoute role="superadmin"><UserCreate /></ProtectedRoute> },

    { path: PLAN_LIST_PATH, element: <ProtectedRoute role="superadmin"><PlanList /></ProtectedRoute> },
];
