import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	isFatching:false,
	current:0,
	total:0,
	list:[],
	pageSize:0
})
export default function(state = defaultState,action){
	if (action.type === types.SET_PAGE) {
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})
	}
	if (action.type === types.PAGE_REQUEST) {
		return state.set("isFatching", true)
	}
	if (action.type === types.PAGE_DONE) {
		return state.set("isFatching", false)
	}
	return state;
};