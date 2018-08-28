import * as types from './actionTypes.js';
import {  message } from 'antd';
import {  request } from 'util';
import {  ADD_CATEGORY,GET_CATEGORIES } from 'api';


export const getAddRequestAction = ()=>{
	return ({
		type:types.ADD_REQUEST
	})
}
export const getAddDoneAction = ()=>{
	return ({
		type:types.ADD_DONE
	})
}
export const setLevelOneCategoriesAction = (payload)=>{
	return ({
		type:types.SET_LEVEL_ONE,
		payload
	})
}
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
export const getAddAction = (values)=>{
	return (dispatch)=>{
		const action = getAddRequestAction();
		dispatch(action);
		request({
			method: 'post',
			url: ADD_CATEGORY,
			data: values
		})
		.then(function (result) {
			if (result.code === 0) {
				if (result.data) {
					dispatch(setLevelOneCategoriesAction(result.data));
				}
				message.success('添加分类成功')
				// getLevelOneCategoriesAction();
			}else{
				message.error(result.message)
			}
			dispatch(getAddDoneAction());
		})
		.catch(function (err) {
			console.log(err);
			const action = getAddDoneAction();
			dispatch(action);
		});
	}
}
export const getLevelOneCategoriesAction = ()=>{
	return (dispatch)=>{
		dispatch(getAddRequestAction());
		request({
			url: GET_CATEGORIES,
			data: {
				pid:0
			}
		})
		.then(function (result) {
			if (result.code === 0) {
				console.log(result);
			}else{
				message.error(result.message)
			}
			dispatch(setLevelOneCategoriesAction(result.data));
		})
		.catch(function (err) {
			message.error('操作失败');
		});
	}
}
export const getPageAction = (pid,page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction());
		request({
			url: GET_CATEGORIES,
			data: {
				pid:pid,
				page:page
			}
		})
		.then(function (result) {
			if (result.code === 0) {
				// console.log('result::::::',result);
				dispatch(getSetPageAction(result.data));
			}else{
				message.error(result.message)
			}
			dispatch(getPageDoneAction());
		})
		.catch(function (err) {
			message.error('操作失败la');
		});
	}
}

