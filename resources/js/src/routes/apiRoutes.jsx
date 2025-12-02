export const LIST_PLAN = 'superadmin/plans';
export const STORE_PLAN = 'superadmin/plans';
export const GET_EDIT_PLAN = (id) => `superadmin/plans/${id}/edit`;
export const UPDATE_PLAN = (id) => `superadmin/plans/${id}`;
export const DELETE_PLAN = (id) => `superadmin/plans/${id}`;

export const STORE_BUSINESS = 'superadmin/business';
export const LIST_BUSINESS = 'superadmin/business';
export const GET_CURRENCIES = 'get/currencies';
export const GET_TIMEZONES = 'get/timezones';

export const GET_ALL_PLANS = 'superadmin/get/all/plans';

export const LIST_BRANCH = 'admin/branches';
export const STORE_BRANCH = 'admin/branches';
export const GET_EDIT_BRANCH = (id) => `admin/branches/${id}`;
export const UPDATE_BRANCH = (id) => `admin/branches/${id}`;
export const DELETE_BRANCH = (id) => `admin/branches/${id}`;

export const STORE_VAT = 'admin/vats';
export const LIST_VAT = 'admin/vats';
export const DELETE_VAT = (id) => `admin/vats/${id}`;
export const UPDATE_VAT = (id) => `admin/vats/${id}`;

export const UPDATE_BUSINESS = (id) => `admin/business/setting/update/${id}`;
export const GET_OWNER_BUSINESS = 'admin/owner/business';
export const CREATE_NOTIFICATION_SETTING = 'admin/notification/update';
export const GET_NOTIFICATION_SETTING = 'admin/get/notification/setting';
export const UPDATE_INVOICE_SETTING = 'admin/update/invoice/setting';
export const GET_INVOICE_SETTING = 'admin/get/invoice/setting';
