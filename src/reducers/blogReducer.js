import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

    switch (action.type) {

        case 'INIT_BLOGS':
            return action.data

        case 'NEW_BLOG':
            return [ ...state, action.data ]

        case 'DELETE_BLOG':
            const remainingBlogs = state.filter(b => b.id !== action.id)
            return remainingBlogs

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

        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
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

export default blogReducer