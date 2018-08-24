import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	isFatching:false
})
export default function(state = defaultState,action){
	if (action.type === types.LOGIN_REQUEST) {
		return state.set("isFatching", true)
	}
	if (action.type === types.LOGIN_DONE) {
		return state.set("isFatching", false)
	}
	return state;
};