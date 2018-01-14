import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const initialState = {
    username: '',
    password: '',
    user: null,
}

const loginReducer = (state = initialState, action) => {

    let newState

    switch (action.type) {

        case 'LOGGED_IN_USER':
            newState = { username: '', password: '', user: action.data }
            return newState

        case 'SET_FIELD':
            newState = {
                ...state,
                [action.data.field]: action.data.value
            }

            return newState

        case 'SET_USER':
            newState = {
                ...state,
                user: action.data
            }

            return newState
        
        default:
            return state
    }
}

export const loginAction = (username, password) => {

    return async (dispatch) => {

        try {
            const user = await loginService.login({
                username,
                password
            })

            console.log(user)
    
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
    
            dispatch({
                type: 'LOGGED_IN_USER',
                data: user
            })
        } catch (exception) {
            dispatch(notify('wrong username or password', 'error', 3))
        }
    }
}

export const logoutAction = () => {

    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    return {
        type: 'SET_USER',
        data: null
    }
}

export const loginFieldChange = (field, value) => {
    return {
        type: 'SET_FIELD',
        data: { field, value }
    }
}

export const isLoggedIn = () => {

    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)

        return {
            type: 'SET_USER',
            data: user
        }
    } else {
        return {
            type: 'SET_USER',
            data: null
        }
    }
}

export default loginReducer