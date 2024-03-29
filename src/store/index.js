import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
import { thunk } from 'redux-thunk'

const store = createStore(
    combineReducers({heroes,filters}),
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );

export default store;