import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	parentCategoryId:'',
	categoryId:'',
	images:'',
	detail:'',
	categoryIdValidateStatus:'',
	categoryIdHelp:'',
	isSaveFatching:false,
	isPageFetching:false,
	current:0,
	total:0,
	list:[],
	pageSize:0,

	editName:'',
	editDescription:'',
	editPrice:'',
	editStock:'',
	keyword:''
})
export default function(state = defaultState,action){

	if (action.type === types.SET_CATEGORY) {
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,
			categoryIdValidateStatus:'',
			categoryIdHelp:''
		})
	}
	if (action.type === types.SET_IMAGES) {
		return state.set('images',action.payload)
	}
	if (action.type === types.SET_DETAIL) {
		return state.set('detail',action.payload)
	}
	if (action.type === types.SET_CATEGORY_ERROR) {
		return state.merge({
			categoryIdValidateStatus:'error',
			categoryIdHelp:'请选择所属分类'
		})
	}


	if (action.type === types.SAVE_START) {
		return state.set('isSaveFatching',true)
	}
	if (action.type === types.SAVE_DONE) {
		return state.set('isSaveFatching',false)
	}

	
	if (action.type === types.SET_PAGE) {
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list),
			keyword:action.payload.keyword
		})
	}
	if (action.type === types.PAGE_REQUEST) {
		return state.set("isPageFetching", true)
	}
	if (action.type === types.PAGE_DONE) {
		return state.set("isPageFetching", false)
	}

	if (action.type === types.SET_EDIT_PRODUCT) {
		return state.merge({
			parentCategoryId:action.payload.category.pid,
			categoryId:action.payload.category._id,
			images:action.payload.images,
			detail:action.payload.detail,
			editName:action.payload.name,
			editDescription:action.payload.description,
			editPrice:action.payload.price,
			editStock:action.payload.stock,
		})
	}

	return state;
};