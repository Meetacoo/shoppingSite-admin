import * as types from './actionTypes.js';
import {  message } from 'antd';
import {  request } from 'util';
import {  ADMIN_COUNT } from 'api';

export const setCountAction = (values)=>{
	return ({
		type:types.SET_COUNT,
		payload:values
	})
}
export const getCountAction = (values)=>{
	return (dispatch)=>{
		request({
			url: ADMIN_COUNT
		})
		.then(function (result) {
			console.log('after axios',result);
			if (result.code === 0) {
				dispatch(setCountAction(result))
			} else if (result.code === 1) {
				message.error(result.message);
			} else {
				console.log('action....')
			}
				
		})
		.catch(function (err) {
			console.log(err);
		});
	}
}