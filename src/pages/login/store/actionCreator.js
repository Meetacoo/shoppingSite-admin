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
	/*
		const action = getLoginRequestAction();
		dispatch(action);
		axios({
			method: 'post',
			url: 'http://127.0.0.1:8060/admin/login',
			data: values
		})
		.then(function (result) {
			let data = result.data;
			if (data.code === 0) {
				window.location.href = '/';
				const action = getLoginDoneAction();
				dispatch(action);
			} else if (data.code === 10) {
				message.error(data.message);
				const action = getLoginDoneAction();
				dispatch(action);
			}
		})
		.catch(function (err) {
			console.log(err);
			const action = getLoginDoneAction();
			dispatch(action);
		});
	*/
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
			}
		})
		.catch(function (err) {
			console.log(err);
			const action = getLoginDoneAction();
			dispatch(action);
		});
	}
}