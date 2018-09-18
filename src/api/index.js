const server = 'http://127.0.0.1:8060';

export const LOGIN_ADMIN = server+'/admin/login';
export const USER_LOGOUT = server+'/user/logout';
export const ADMIN_COUNT = server+'/admin/count';
export const GET_USERS = server+'/admin/users';


export const ADD_CATEGORY = server+'/category';
export const GET_CATEGORIES = server+'/category';
export const UPDATE_NAME = server+'/category/updateName';
export const UPDATE_CATEGORY_ORDER = server+'/category/updateOrder';

export const PRODUCT_UPLOAD_IMAGE = server+'/product/uploadImage';
export const PRODUCT_UPLOAD_DETAIL_IMAGE = server+'/product/uploadDetailImage';

export const GET_PRODUCTS = server+'/product';
export const SAVE_PRODUCT = server+'/product/save';
export const UPDATE_PRODUCT_ORDER = server+'/product/updateOrder';
export const UPDATE_PRODUCT_STATUS = server+'/product/updateStatus';
export const GET_PRODUCT_DETAIL = server+'/product/detail';
export const GET_PRODUCTS_SEARCH = server+'/product/search';

export const GET_ORDERS = server+'/order';
export const GET_ORDER_DETAIL = server+'/order/detail';
export const ORDER_SEARCH = server+'/order/search';
export const UPDATE_ORDER_DELIVER = server+'/order/deliver';