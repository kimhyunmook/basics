import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import reducers from './reducers'; // reducers 
import { createStore,applyMiddleware } from 'redux'; // redux@4.1.2
import thunk from 'redux-thunk'; // useDispatch 사용시 필요
import promiseMiddleware from 'redux-promise' // store 사용시

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk) (createStore)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={ createStoreWithMiddleware (reducers) }>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
