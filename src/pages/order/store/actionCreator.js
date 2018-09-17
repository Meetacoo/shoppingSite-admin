import * as types from './actionTypes.js';
import { message } from 'antd';
import { request } from 'util';
import {
	GET_ORDERS,
	GET_ORDER_DETAIL,
	ORDER_SEARCH
} from 'api';


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

export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction());
		request({
			url: GET_ORDERS,
			data: {
				page:page
			}
		})
		.then((result)=> {
			if (result.code === 0) {
				// console.log('result::::::',result.data);
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

export const getSearchAction = (keyword,page)=>{
	return (dispatch)=>{
		request({
			method: 'get',
			url: ORDER_SEARCH,
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

const setOrderDetail = (payload)=>({
	type:types.SET_ORDER_DETAIL,
	payload
})
export const getOrderDetailAction = (orderNo)=>{
	return (dispatch)=>{
		request({
			method: 'get',
			url: GET_ORDER_DETAIL,
			data: {
				id:orderNo
			}
		})
		.then((result)=> {
			console.log(result)
			if (result.code === 0) {
				console.log('result.data:::',result.data)
				dispatch(setOrderDetail(result.data))
			
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
