import React from 'react'

const BlogForm = (props) => {
    const { addBlog, new_title, new_author,
            new_url, handleBlogFieldChange } = props

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title
                    <input type="text"
                           name="title"
                           value={new_title}
                           onChange={handleBlogFieldChange}
                    />
                </div>
                <div>
                    Author
                    <input type="text"
                           name="author"
                           value={new_author}
                           onChange={handleBlogFieldChange}
                    />
                </div>
                <div>
                    URL
                    <input type="text"
                           name="url"
                           value={new_url}
                           onChange={handleBlogFieldChange}
                    />
                </div>
                <button>Create</button>
            </form>
        </div>
    )
}

export default BlogForm
