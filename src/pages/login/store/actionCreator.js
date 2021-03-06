import * as types from './actionTypes.js';
import {  message } from 'antd';
import {  request,setUserName } from 'util';
import {  LOGIN_ADMIN } from 'api';


export const getLoginRequestAction = ()=>{
	return ({
		type:types.LOGIN_REQUEST
	})
}
export const getLoginDoneAction = ()=>{
	return ({
		type:types.LOGIN_DONE
	})
}
export const getLoginAction = (values)=>{
	return (dispatch)=>{
		const action = getLoginRequestAction();
		dispatch(action);
		request({
			method: 'post',
			url: LOGIN_ADMIN,
			data: values
		})
		.then(function (result) {
			if (result.code === 0) {
				setUserName(result.data.username);
				window.location.href = '/';
				const action = getLoginDoneAction();
				dispatch(action);
			} else if (result.code === 1) {
				message.error(result.message);
				const action = getLoginDoneAction();
				dispatch(action);
			} else {
				console.log('action....')
				const action = getLoginDoneAction();
				dispatch(action);
			}
				
		})
		.catch(function (err) {
			console.log(err);
			const action = getLoginDoneAction();
			dispatch(action);
		});
	}
}