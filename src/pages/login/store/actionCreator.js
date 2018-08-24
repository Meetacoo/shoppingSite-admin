import * as types from './actionTypes.js';
import axios from 'axios';


export const changeValueAction = (payload)=>{
	return ({
		type:types.CHANGE_VALUE,
		payload
	})
}
export const loadInitDataAction = (payload)=>{
	return ({
		type:types.LOAD_INIT_DATA,
		payload
	})
}
export const addItemAction = ()=>{
	return ({
		type:types.ADD_ITEM
	})
}
export const delItemAction = (payload)=>{
	return ({
		type:types.DEL_ITEM,
		payload
	})
}
export const getInitDataAction = ()=>{
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:8060')
		.then((data)=>{
			// console.log(data);
			const action = loadInitDataAction(data.data);
			dispatch(action);
		})
	}
}