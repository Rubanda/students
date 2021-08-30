import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'

import classesReducer from "./reducers/classesReducer"
import coursesReducer from "./reducers/coursesReducer"
import studentsReducer from "./reducers/studentsReducer"

const initialState = {};

const reducer = combineReducers({
  classesReducer,
  coursesReducer,
  studentsReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;
