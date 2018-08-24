import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer.js';

const middleWare = [thunk];
if (process.env.NODE_ENV !== 'production') {
	const logger = createLogger({});
	middleWare.push(logger)
}

// const store = createStore(reducer,applyMiddleware(thunk,logger))
const store = createStore(reducer,applyMiddleware(...middleWare))
export default store;