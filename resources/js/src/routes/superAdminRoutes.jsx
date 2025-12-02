import ProtectedRoute from "../ProtectedRoute";
import Dashboard from "../components/superadmin/Dashboard";
import MasterSetting from "../components/superadmin/MasterSetting";
import SaveOrder from "../components/order/SaveOrder";
import UserList from "../components/user/UserList";
import UserCreate from "../components/user/UserCreate";

import PlanList from "../components/superadmin/plan/PlanList";
import PlanCreate from "../components/superadmin/plan/PlanCreate";
import PlanEdit from "../components/superadmin/plan/PlanEdit";

import BusinessList from "../components/superadmin/Business/BusinessList";
import BusinessCreate from "../components/superadmin/Business/BusinessCreate";
import BusinessEdit from "../components/superadmin/Business/BusinessEdit";


import { DASHBOARD, SUPER_ADMIN_BASE } from "./commonRoutes";


export const SUPERADMIN_DASHBOARD_PATH = `${SUPER_ADMIN_BASE}/dashboard`;

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

export const BUSINESS_LIST = "business/list";
export const BUSINESS_ADD = "business/create";
export const BUSINESS_EDIT = "business/edit/:id";

export const BUSINESS_LIST_PATH = `${SUPER_ADMIN_BASE}/business/list`;
export const BUSINESS_ADD_PATH = `${SUPER_ADMIN_BASE}/business/create`;
export const BUSINESS_EDIT_PATH = (id) => `${SUPER_ADMIN_BASE}/business/edit/${id}`;

export const superAdminRoutes = [
    { path: DASHBOARD, element: <ProtectedRoute role="superadmin"><Dashboard /></ProtectedRoute> },
    { path: "settings", element: <ProtectedRoute role="superadmin"><MasterSetting /></ProtectedRoute> },
    { path: "save/order", element: <ProtectedRoute role="superadmin"><SaveOrder /></ProtectedRoute> },

    { path: USER_LIST_PATH, element: <ProtectedRoute role="superadmin"><UserList /></ProtectedRoute> },
    { path: USER_ADD_PATH, element: <ProtectedRoute role="superadmin"><UserCreate /></ProtectedRoute> },

    { path: PLAN_LIST_PATH, element: <ProtectedRoute role="superadmin"><PlanList /></ProtectedRoute> },
    { path: PLAN_ADD_PATH, element: <ProtectedRoute role="superadmin"><PlanCreate /></ProtectedRoute> },
    { path: PLAN_EDIT, element: <ProtectedRoute role="superadmin"><PlanEdit /></ProtectedRoute> },
    
    
    { path: BUSINESS_LIST_PATH, element: <ProtectedRoute role="superadmin"><BusinessList /></ProtectedRoute> },
    { path: BUSINESS_ADD_PATH, element: <ProtectedRoute role="superadmin"><BusinessCreate /></ProtectedRoute> },
    { path: BUSINESS_EDIT, element: <ProtectedRoute role="superadmin"><BusinessEdit /></ProtectedRoute> },
];
