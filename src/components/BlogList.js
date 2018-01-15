import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Table } from 'semantic-ui-react'

const BlogList = ({ blogs }) => {

    return (
        <Table celled striped>
            <Table.Body>
                {blogs.map(blog =>
                <Table.Row key={blog.id}>
                    <Table.Cell>
                        <Icon name='sticky note'/> <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </Table.Cell>
                </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

export default BlogList