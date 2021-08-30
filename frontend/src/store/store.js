import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import classesReducer from "./reducers/classesReducer"
// import { classReducer, SingleclassReducer } from './reducers/classReducer';

const initialState = {};

const reducer = combineReducers({
  classesReducer: classesReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;
