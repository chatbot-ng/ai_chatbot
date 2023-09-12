import { legacy_createStore,applyMiddleware } from "redux";
import logger from 'redux-logger'
import reducer from "./reducer";
import thunk from "redux-thunk";
const store = legacy_createStore(reducer,applyMiddleware(thunk,logger))
export default store