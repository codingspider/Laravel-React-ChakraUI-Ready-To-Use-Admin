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

import CategoryList from "../components/superadmin/category/CategoryList";
import CategoryCreate from "../components/superadmin/category/CategoryCreate";
import CategoryEdit from "../components/superadmin/category/CategoryEdit";

import UnitList from "../components/superadmin/unit/UnitList";
import UnitCreate from "../components/superadmin/unit/UnitCreate";
import UnitEdit from "../components/superadmin/unit/UnitEdit";

import RoleList from "../components/superadmin/permission/List";
import RoleCreat from "../components/superadmin/permission/Create";
import RoleEdit from "../components/superadmin/permission/Edit";

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

export const CATEGORIES = '/get/categories';
export const STORE_CATEGORY = `${SUPER_ADMIN_BASE}/categories`;
export const LIST_CATEGORY = `${SUPER_ADMIN_BASE}/categories`;
export const DELETE_CATEGORY = (id) => `${SUPER_ADMIN_BASE}/categories/${id}`;
export const UPDATE_CATEGORY = (id) => `${SUPER_ADMIN_BASE}/categories/${id}`;
export const GET_EDIT_CATEGORY = (id) => `${SUPER_ADMIN_BASE}/categories/${id}`;

export const BUSINESS_LIST = "business/list";
export const BUSINESS_ADD = "business/create";
export const BUSINESS_EDIT = "business/edit/:id";

export const BUSINESS_LIST_PATH = `${SUPER_ADMIN_BASE}/business/list`;
export const BUSINESS_ADD_PATH = `${SUPER_ADMIN_BASE}/business/create`;
export const BUSINESS_EDIT_PATH = (id) => `${SUPER_ADMIN_BASE}/business/edit/${id}`;

export const CATEGORY_LIST = "category/list";
export const CATEGORY_ADD = "category/create";
export const CATEGORY_EDIT = "category/edit/:id";

export const CATEGORY_LIST_PATH = `${SUPER_ADMIN_BASE}/category/list`;
export const CATEGORY_ADD_PATH = `${SUPER_ADMIN_BASE}/category/create`;
export const CATEGORY_EDIT_PATH = (id) => `${SUPER_ADMIN_BASE}/category/edit/${id}`;


export const UNIT_LIST = "unit/list";
export const UNIT_ADD = "unit/create";
export const UNIT_EDIT = "unit/edit/:id";

export const UNIT_LIST_PATH = `${SUPER_ADMIN_BASE}/unit/list`;
export const UNIT_ADD_PATH = `${SUPER_ADMIN_BASE}/unit/create`;
export const UNIT_EDIT_PATH = (id) => `${SUPER_ADMIN_BASE}/unit/edit/${id}`;

export const ROLE_LIST = "role/list";
export const ROLE_ADD = "role/create";
export const ROLE_EDIT = "role/edit/:id";

export const ROLE_LIST_PATH = `${SUPER_ADMIN_BASE}/role/list`;
export const ROLE_ADD_PATH = `${SUPER_ADMIN_BASE}/role/create`;
export const ROLE_EDIT_PATH = (id) => `${SUPER_ADMIN_BASE}/role/edit/${id}`;

export const superAdminRoutes = [
    { path: SUPERADMIN_DASHBOARD_PATH, element: <ProtectedRoute role="superadmin"><Dashboard /></ProtectedRoute> },
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

    { path: CATEGORY_LIST_PATH, element: <ProtectedRoute role="superadmin"><CategoryList /></ProtectedRoute> },
    { path: CATEGORY_ADD_PATH, element: <ProtectedRoute role="superadmin"><CategoryCreate /></ProtectedRoute> },
    { path: CATEGORY_EDIT, element: <ProtectedRoute role="superadmin"><CategoryEdit /></ProtectedRoute> },
    
    { path: UNIT_LIST_PATH, element: <ProtectedRoute role="superadmin"><UnitList /></ProtectedRoute> },
    { path: UNIT_ADD_PATH, element: <ProtectedRoute role="superadmin"><UnitCreate /></ProtectedRoute> },
    { path: UNIT_EDIT, element: <ProtectedRoute role="superadmin"><UnitEdit /></ProtectedRoute> },
 
    { path: ROLE_LIST_PATH, element: <ProtectedRoute role="superadmin"><RoleList /></ProtectedRoute> },
    { path: ROLE_ADD_PATH, element: <ProtectedRoute role="superadmin"><RoleCreat /></ProtectedRoute> },
    { path: ROLE_EDIT, element: <ProtectedRoute role="superadmin"><RoleEdit /></ProtectedRoute> },
];
