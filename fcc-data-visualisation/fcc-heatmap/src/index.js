import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import reducer from './redux/reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import ChartContainer from './ChartContainer';

const middleware = applyMiddleware(thunk, logger)
const store = createStore(reducer, middleware);


ReactDOM.render(
    <Provider store={store}>
        <ChartContainer />
    </Provider>, 
    document.getElementById('root'));
