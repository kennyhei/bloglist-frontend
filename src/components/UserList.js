import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const UserList = ({ users }) => {

    return (
        <div>
            <h2>Users</h2>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Blogs added</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(user =>
                    <Table.Row key={user.id}>
                        <Table.Cell>
                            <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </Table.Cell>
                        <Table.Cell>
                            {user.blogs.length}
                        </Table.Cell>
                    </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}

export default UserList