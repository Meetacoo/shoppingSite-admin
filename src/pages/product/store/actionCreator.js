import * as types from './actionTypes.js';
import { message } from 'antd';
import { request } from 'util';
import { 
	SAVE_PRODUCT,
	GET_PRODUCTS,
	UPDATE_PRODUCT_ORDER,
	UPDATE_PRODUCT_STATUS,
	GET_PRODUCT_DETAIL,
	GET_PRODUCTS_SEARCH
} from 'api';


export const getSetCategoryAction = (parentCategoryId,categoryId)=>({
	type:types.SET_CATEGORY,
	payload:{
		parentCategoryId,
		categoryId
	}
})
export const getSetImagesAction = (fileList)=>({
	type:types.SET_IMAGES,
	payload:fileList
})
export const getSetDetailAction = (value)=>({
	type:types.SET_DETAIL,
	payload:value
})

export const getSaveRequestAction = ()=>{
	return ({
		type:types.SAVE_START
	})
}
export const getSaveDoneAction = ()=>{
	return ({
		type:types.SAVE_DONE
	})
}


export const getPageRequestAction = ()=>{
	return ({
		type:types.PAGE_REQUEST
	})
}
export const getSetPageAction = (payload)=>{
	return ({
		type:types.SET_PAGE,
		payload
	})
}
export const getPageDoneAction = ()=>{
	return ({
		type:types.PAGE_DONE
	})
}



const setCategoryError = ()=>({
	type:types.SET_CATEGORY_ERROR
})

const setImagesError = ()=>({
	type:types.SET_IMAGES_ERROR
})
export const getSaveAction = (err,values)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product');
		const categoryId = state.get('categoryId');
		const images = state.get('images');
		let hasError = false;
		console.log(images)
		if (!categoryId) {
			dispatch(setCategoryError())
			// return;
			hasError = true;
		}
		if (!images) {
			dispatch(setImagesError())
			// return;
			hasError = true;
		}
		if (hasError) {
			return;
		}
		console.log(err)
		if (err) {
			return;
		}

		let method = 'post';
		if (values.id) {
			method = 'put';
		}

		dispatch(getSaveRequestAction());
		request({
			method: method,
			url: SAVE_PRODUCT,
			data: {
				...values,
				category:state.get('categoryId'),
				images:state.get('images'),
				detail:state.get('detail'),
			}
		})
		.then(function (result) {
			if (result.code === 0) {
				// dispatch(getSetPageAction(result.data));
				message.success(result.message);
				window.location.href = '/product'
			}
			dispatch(getSaveDoneAction());
		})
		.catch((err)=> {
			message.error('网络错误,请稍后在试!')
			dispatch(getSaveDoneAction());
		});
	}
}


export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction());
		request({
			url: GET_PRODUCTS,
			data: {
				page:page
			}
		})
		.then((result)=> {
			if (result.code === 0) {
				console.log('result::::::',result.data);
				dispatch(getSetPageAction(result.data));
			}else{
				message.error(result.message)
			}
			dispatch(getPageDoneAction());
		})
		.catch((err) => {
			message.error('网络错误,请稍后在试!');
			dispatch(getPageDoneAction());
		});
	}
}


export const getUpdateOrderAction = (id,newOrder)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product')
		request({
			method: 'put',
			url: UPDATE_PRODUCT_ORDER,
			data: {
				id:id,
				order:newOrder,
				page:state.get('current')
			}
		})
		.then((result)=> {
			if (result.code === 0) {
				if (result.data) {
					dispatch(getSetPageAction(result.data));
					message.success('更改排序成功');
				}
				// console.log('result::::::',result);
			}else{
				message.error(result.message)
			}
		})
		.catch((err) => {
			message.error('更改排序失败');
		});
	}
}


export const getUpdateStatusAction = (id,newStatus)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product')
		request({
			method: 'put',
			url: UPDATE_PRODUCT_STATUS,
			data: {
				id:id,
				status:newStatus,
				page:state.get('current')
			}
		})
		.then((result)=> {
			console.log(result)
			if (result.code === 0) {
				if (result.data) {
					message.success('更改状态成功');
				}
				// console.log('result::::::',result);
			}else{
				dispatch(getSetPageAction(result.data));
				message.error(result.message)
			}
		})
		.catch((err) => {
			message.error('更改状态失败');
		});
	}
}


const setEditProduct = (payload)=>({
	type:types.SET_EDIT_PRODUCT,
	payload
})
export const getEditProductAction = (productId)=>{
	return (dispatch)=>{
		request({
			method: 'get',
			url: GET_PRODUCT_DETAIL,
			data: {
				id:productId
			}
		})
		.then((result)=> {
			if (result.code === 0) {
				dispatch(setEditProduct(result.data))
			
				// message.success('更改排序成功');
			}else{
				message.error(result.message)
			}
		})
		.catch((err) => {
			message.error('获取商品失败');
		});
	}
}

export const getSearchAction = (keyword,page)=>{
	return (dispatch)=>{
		request({
			method: 'get',
			url: GET_PRODUCTS_SEARCH,
			data: {
				keyword,
				page
			}
		})
		.then((result)=> {
			if (result.code === 0) {
				dispatch(getSetPageAction(result.data))
			}else{
				message.error(result.message)
			}
		})
		.catch((err) => {
			message.error('获取商品失败');
		});
	}
}
