import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { storageService } from '../services';

const loggerMiddleware = createLogger();



export const store = createStore(
    rootReducer,composeWithDevTools(
        applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware,
    ),)
);

