import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const loginReducer = (state = null, action) => {

    switch (action.type) {

        case 'LOGGED_IN_USER':
            return action.data

        case 'LOGOUT_USER':
            return null
        
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
        type: 'LOGOUT_USER'
    }
}

export const isLoggedIn = () => {

    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)

        return {
            type: 'LOGGED_IN_USER',
            data: user
        }
    } else {
        return {
            type: 'LOGOUT_USER'
        }
    }
}

export default loginReducer