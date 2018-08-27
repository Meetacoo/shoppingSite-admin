import * as types from './actionTypes.js';
import {  request } from 'util';
import {  GET_USERS } from 'api';
import {  message } from 'antd';


export const getPageRequestAction = ()=>{
	return ({
		type:types.PAGE_REQUEST
	})
}
export const getPageDoneAction = ()=>{
	return ({
		type:types.PAGE_DONE
	})
}
export const getSetPageAction = (payload)=>{
	return ({
		type:types.SET_PAGE,
		payload
	})
}
export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction());
		request({
			method:'get',
			url: GET_USERS,
			data:{
				page:page
			}
		})
		.then((result) => {
			console.log(result)
			if (result.code === 0) {
				dispatch(getSetPageAction(result.data));
			}else{
				message.error('服务器错误')
			}
			dispatch(getPageDoneAction());
		})
		.catch(function (err) {
			// console.log(err);
			message.error('服务器错误')
			const action = getPageDoneAction();
			dispatch(action);
		});
	}
}