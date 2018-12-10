import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import reducer from './redux/reducers';
import ChartContainer from './ChartContainer';

import thunk from 'redux-thunk';
//redux connection

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, middleware);



ReactDOM.render(
    <Provider store={store}>
        <ChartContainer />
    </Provider>, 
    document.getElementById('root'));
