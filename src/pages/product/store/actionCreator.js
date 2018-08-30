import * as types from './actionTypes.js';
import {  message } from 'antd';
import {  request } from 'util';
import {  ADD_CATEGORY,GET_CATEGORIES,UPDATE_NAME,UPDATE_ORDER } from 'api';


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




export const getUpdateNameRequestAction = ()=>{
	return ({
		type:types.CHANGE_NAME_REQUEST
	})
}
export const getUpdateNameDoneAction = ()=>{
	return ({
		type:types.CHANGE_NAME_DONE
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
		.catch((err)=> {
			message.error('网络错误,请稍后在试!')
			dispatch(getAddDoneAction());
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
				// console.log(result);
				dispatch(setLevelOneCategoriesAction(result.data))
			}else{
				message.error(result.message)
			}
			// dispatch(setLevelOneCategoriesAction(result.data));
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
		.then((result)=> {
			if (result.code === 0) {
				// console.log('result::::::',result);
				dispatch(getSetPageAction(result.data));
			}else{
				message.error(result.message)
			}
			dispatch(getPageDoneAction());
		})
		.catch((err) => {
			message.error('操作失败la');
			dispatch(getPageDoneAction());
		});
	}
}
export const getShowUpdateModalAction = (updateId,updateName)=>{
	return ({
		type:types.SHOW_UPDATE_MODAl,
		payload:{
			updateId,
			updateName
		}
	})
}
export const getHideUpdateModalAction = (updateId,updateName)=>{
	return ({
		type:types.HIDE_UPDATE_MODAl
	})
}

export const getChangeNameAction = (payload)=>{
	return {
		type:types.CHANGE_NAME,
		payload
	}
}



export const getSetUpdateNameAction = (pid)=>{
	return (dispatch,getState)=>{
		dispatch(getUpdateNameRequestAction());

		const state = getState().get('category')
		request({
			method: 'put',
			url: UPDATE_NAME,
			data: {
				id:state.get('updateId'),
				name:state.get('updateName'),
				pid:pid,
				page:state.get('current')
			}
		})
		.then((result)=> {
			if (result.code === 0) {
				if (result.data) {
					dispatch(getSetPageAction(result.data));
					dispatch(getHideUpdateModalAction());
				}
				message.success('更改名称成功');
				// console.log('result::::::',result);
					dispatch(getUpdateNameDoneAction());
			}else{
				message.error(result.message)
			}
		})
		.catch((err) => {
			message.error('更改名称失败');
		});
	}
}

export const getUpdateOrderAction = (pid,id,newOrder)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category')
		request({
			method: 'put',
			url: UPDATE_ORDER,
			data: {
				id:id,
				order:newOrder,
				pid:pid,
				page:state.get('current')
			}
		})
		.then((result)=> {
			if (result.code === 0) {
				if (result.data) {
					dispatch(getSetPageAction(result.data));
					dispatch(getHideUpdateModalAction());
				}
				message.success('更改名称成功');
				// console.log('result::::::',result);
			}else{
				message.error(result.message)
			}
		})
		.catch((err) => {
			message.error('更改名称失败');
		});
	}
}

