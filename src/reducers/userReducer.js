import userService from '../services/users'
import { notify } from './notificationReducer'
import { loginAction } from './loginReducer'

const userReducer = (state = [], action) => {

    switch (action.type) {

        case 'INIT_USERS':
            return action.data

        case 'CREATE_USER':
            return [ ...state, action.data ]

        default:
            return state
    }
}

export const initializeUsers = () => {

    return async (dispatch) => {

        const users = await userService.getAll()
        window.localStorage.setItem('users', JSON.stringify(users))

        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

export const createUser = (username, password, history) => {

    return async (dispatch) => {

        try {
            const userObj = {
                username,
                password
            }

            const newUser = await userService.create(userObj)
            dispatch({
                type: 'CREATE_USER',
                data: newUser
            })

            // Login after signing up
            dispatch(loginAction(username, password, history))
        }
        catch (exception) {
            dispatch(notify(exception.response.data.error, 'error', 3))
        }
    }
}

export default userReducer