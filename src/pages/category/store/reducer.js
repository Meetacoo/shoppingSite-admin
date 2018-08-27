import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	isCateFatching:true
})
export default function(state = defaultState,action){
	if (action.type === types.CATEGORY_REQUEST) {
		return state.set("isCateFatching", true)
	}
	if (action.type === types.CATEGORY_DONE) {
		return state.set("isCateFatching", false)
	}
	return state;
};