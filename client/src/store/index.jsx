import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import createSagaMiddleware from "redux-saga";
import userReducer from "./userSlice";
import menuReducer from './menuSlice';
import rootSaga from "./sagas/rootSaga";
// import promiseMiddleware from 'redux-promise' // store 사용시


const rootReducer = combineReducers({
    userInfo: userReducer,
    menuInfo: menuReducer,
    // others...
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['userInfo','menuInfo'], // 해당 reducer만 저장
    // blacklist: [''] // 해당 reducer만 제외
};
const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        sagaMiddleware
    ]
});

sagaMiddleware.run(rootSaga); // Listener
export default store;