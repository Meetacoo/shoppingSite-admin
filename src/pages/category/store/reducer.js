import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	isAddFetching:false,
	levelonecategories:[],
	isPageFetching:false,
	current:0,
	total:0,
	list:[],
	pageSize:0,
	updateModalVisible:false,
	updateId:'',
	updateName:''
})
export default function(state = defaultState,action){
	if (action.type === types.ADD_REQUEST) {
		return state.set("isAddFetching", true)
	}
	if (action.type === types.ADD_DONE) {
		return state.set("isAddFetching", false)
	}
	if (action.type === types.SET_LEVEL_ONE) {
		return state.set("levelonecategories", fromJS(action.payload))
	}


	if (action.type === types.SET_PAGE) {
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})
	}
	if (action.type === types.PAGE_REQUEST) {
		return state.set("isPageFetching", true)
	}
	if (action.type === types.PAGE_DONE) {
		return state.set("isPageFetching", false)
	}

	if (action.type === types.SHOW_UPDATE_MODAl) {
		return state.merge({
			updateModalVisible:true,
			updateId:action.payload.updateId,
			updateName:action.payload.updateName
		})
	}

	if (action.type === types.HIDE_UPDATE_MODAl) {
		return state.merge({
			updateModalVisible:false
		})
	}
	return state;
};