import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from 'pages/login/store';
// import { fromJS } from 'redux-immutable';


export default combineReducers({
	login:loginReducer
})