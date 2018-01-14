import React from 'react'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

const BlogForm = (props) => {
    const { addBlog, new_title, new_author,
            new_url, handleBlogFieldChange } = props

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <FormGroup>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        name="username"
                        value={new_title}
                        onChange={handleBlogFieldChange}
                    />
                    <ControlLabel>Author</ControlLabel>
                    <FormControl
                        type="text"
                        name="author"
                        value={new_author}
                        onChange={handleBlogFieldChange}
                    />
                    <ControlLabel>URL</ControlLabel>
                    <FormControl
                        type="text"
                        name="url"
                        value={new_url}
                        onChange={handleBlogFieldChange}
                    />
                </FormGroup>
                <Button bsSize="small" bsStyle="success" type="submit">Create</Button>
            </form>
        </div>
    )
}

export default BlogForm
