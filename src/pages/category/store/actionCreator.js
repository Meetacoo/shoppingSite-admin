import * as types from './actionTypes.js';
import {  message } from 'antd';
import {  request,setUserName } from 'util';
import {  CATE_NAME } from 'api';


export const getAddRequestAction = ()=>{
	return ({
		type:types.CATEGORY_REQUEST
	})
}
export const getAddDoneAction = ()=>{
	return ({
		type:types.CATEGORY_DONE
	})
}
export const getAddAction = (values)=>{
	return (dispatch)=>{
		const action = getAddRequestAction();
		dispatch(action);
		request({
			method: 'post',
			url: CATE_NAME,
			data: values
		})
		.then(function (result) {
			if (result.code === 0) {
				setUserName(result.data.username);
				window.location.href = '/';
				dispatch(getAddDoneAction());
			} else if (result.code === 1) {
				message.error(result.message);
				dispatch(getAddDoneAction());
			} else {
				console.log('action....')
				dispatch(getAddDoneAction());
			}
				
		})
		.catch(function (err) {
			console.log(err);
			const action = getAddDoneAction();
			dispatch(action);
		});
	}
}