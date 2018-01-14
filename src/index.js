import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import App from './App'
import './index.css'

const reducer = combineReducers({
    blogs: blogReducer,
    users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))


ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('root')
)

store.subscribe(() => console.log(store.getState()))