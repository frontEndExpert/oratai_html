import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import actionTypes from './actions/actionTypes';
import productsReducer from './reducers/products';
import authReducer from './reducers/auth';

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    products: productsReducer,
    auth: authReducer
});

// const store = createStore(rootReducer, composeEnhancers(
//     applyMiddleware(thunk)
// ));

const exampleInitialState = {
    products: {
    products: {},
    loading: false
},
auth: { userId: 0,
        token: null,
        loading: false,
        authShow: false}
};


export function initializeStore (initialState = exampleInitialState) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
