import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const blogReducer = (state = [], action) => {

    switch (action.type) {

        case 'INIT_BLOGS':
            return action.data

        case 'NEW_BLOG':
            return [ ...state, action.data ]

        case 'DELETE_BLOG':
            const remainingBlogs = state.filter(b => b.id !== action.id)
            return remainingBlogs

        case 'LIKE_BLOG':
            const id = action.data.id
            const newState = state.filter(b => b.id !== id)
            const blogToChange = state.find(b => b.id === id)

            const changedBlog = {...blogToChange, likes: blogToChange.likes + 1 }
            return [ ...newState, changedBlog ]

        default:
            return state
    }
}

export const initializeBlogs = () => {

    return async (dispatch) => {

        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (title, author, url) => {

    return async (dispatch) => {

        const blogObject = {
            title,
            author,
            url
        }

        try {
            const newBlog = await blogService.create(blogObject)
            dispatch({
                type: 'NEW_BLOG',
                data: newBlog
            })

            dispatch(notify(`A new blog '${title}' by ${author} added`, 'info', 3))
        } catch (exception) {
            dispatch(notify(exception.response.data.error, 'error', 3))
        }
    }
}

export const deleteBlog = (id) => {

    return async (dispatch) => {

        await blogService.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            id
        })
    }
}

export const likeBlog = (blog) => {

    return async (dispatch) => {

        const changedBlog = {...blog, likes: blog.likes + 1 }
        await blogService.update(blog.id, changedBlog)

        dispatch({
            type: 'LIKE_BLOG',
            data: { id: blog.id }
        })
    }
}

export default blogReducer