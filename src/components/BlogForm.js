import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = (props) => {
    const { addBlog, new_title, new_author,
            new_url, handleBlogFieldChange } = props

    return (
        <div>
            <h2>Create new</h2>
            <Form onSubmit={addBlog}>
                <Form.Field>
                    <label>Title</label>
                    <Form.Input type="text" name="title" value={new_title} onChange={handleBlogFieldChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <Form.Input type="text" name="author" value={new_author} onChange={handleBlogFieldChange}/>
                </Form.Field>
                <Form.Field>
                    <label>URL</label>
                    <Form.Input type="text" name="url" value={new_url} onChange={handleBlogFieldChange}/>
                </Form.Field>
                <Button primary type="submit">Create</Button>
            </Form>
        </div>
    )
}

export default BlogForm
