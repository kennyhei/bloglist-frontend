import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class MenuInverted extends Component {
    state = { activeItem: 'blogs' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu inverted>
                <Menu.Item name='blogs' active={activeItem === 'blogs'} onClick={this.handleItemClick}>
                  <Link to="/blogs">Blogs</Link>
                </Menu.Item>
                <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick}>
                    <Link to="/users">Users</Link>
                </Menu.Item>
                {this.props.loggedInUser &&
                    <Menu.Item>
                        <Button size='small' onClick={this.props.handleLogout}>logout</Button> &nbsp;
                        <em>{this.props.loggedInUser.name} logged in</em>
                    </Menu.Item>
                }
            </Menu>
        )
    }
}

export default MenuInverted