const notificationReducer = (state = {}, action) => {

    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data

        case 'CLEAR_NOTIFICATION':
            return {}

        default:
            return state
    }
}

export const setNotification = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        notification
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export const notify = (notification, type, timeout) => {

    return (dispatch) => {

        dispatch({
            type: 'SET_NOTIFICATION',
            data: { content: notification, type }
        })

        setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, timeout * 1000)
    }
}

export default notificationReducer