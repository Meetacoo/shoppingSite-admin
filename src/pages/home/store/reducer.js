import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	usernum:500,
	ordernum:500,
	goodsnum:500
})
export default function(state = defaultState,action){
	if (action.type === types.SET_COUNT) {
		return state.merge({
			usernum:action.payload.usernum,
			ordernum:action.payload.ordernum,
			goodsnum:action.payload.goodsnum
		})
	}
	return state;
};