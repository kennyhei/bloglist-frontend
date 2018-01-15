import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MenuInverted = (props) => {

    const activeItem = window.location.pathname.substring(1)

    return (
        <Menu inverted>
            <Menu.Item name='blogs' active={activeItem === 'blogs'}>
              <Link to="/blogs">Blogs</Link>
            </Menu.Item>
            <Menu.Item name='users' active={activeItem === 'users'}>
                <Link to="/users">Users</Link>
            </Menu.Item>
            {props.loggedInUser &&
                <Menu.Item>
                    <Button size='small' onClick={props.handleLogout}>logout</Button> &nbsp;
                    <em>{props.loggedInUser.name} logged in</em>
                </Menu.Item>
            }
        </Menu>
    )
}

export default MenuInverted