import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from '../reducers/loginReducer'

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
                    <Button size='small' onClick={(e) => props.logoutAction()}>logout</Button> &nbsp;
                    <em>{props.loggedInUser.name} logged in</em>
                </Menu.Item>
            }
        </Menu>
    )
}

const ConnectedMenuInverted = connect(null, { logoutAction })(MenuInverted)

export default ConnectedMenuInverted