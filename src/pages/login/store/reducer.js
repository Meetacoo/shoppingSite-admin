import  * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	value:'2',
	list:['ccc','ddd']
})
/*const defaultState = {
	value:'2',
	list:['ccc','ddd']
}*/
export default function(state = defaultState,action){
	// console.log(action)
	if (action.type === types.CHANGE_VALUE) {
		/*const newState = JSON.parse(JSON.stringify(state));
		newState.value = action.payload;
		return newState;*/
		return state.set('value',action.payload);
	}
	if (action.type === types.LOAD_INIT_DATA) {
		/*const newState = JSON.parse(JSON.stringify(state));
		newState.list = action.payload;
		return newState;*/
		return state.set('list',action.payload);
	}
	if (action.type === types.ADD_ITEM) {
		/*const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.value);
		newState.value = "";
		return newState;*/
		const newList = [...state.get('list'),state.get('value')];
		// set 只能设置一个属性，merge 能设置多个属性
		return state.merge({
			value:'',
			list:newList
		}); 
	}
	if (action.type === types.DEL_ITEM) {
		/*const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		return newState;*/
		const newList = [...state.get('list')];
		newList.splice(action.payload,1);
		return state.set('list',newList);
	}
	return state;
};