import React from 'react'

const User = ({ user }) => {

    if (!user) {
        return ( <div></div> )
    }

    return (
        <div>
            <h2>{user.username}</h2>

            <h3>Added blogs</h3>

            <ul>
                {user.blogs.map((blog) =>
                    <li key={blog._id}>
                        {blog.title} by {blog.author}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default User