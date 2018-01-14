import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import { connect } from 'react-redux'
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { notify } from './reducers/notificationReducer'
import { loginAction, logoutAction, loginFieldChange, isLoggedIn } from './reducers/loginReducer'

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],

            // Blog fields
            new_title: '',
            new_author: '',
            new_url: ''
        }
    }

    componentWillMount = async () => {

        this.props.isLoggedIn()
        const usersJSON = window.localStorage.getItem('users')
        console.log(usersJSON)

        if (usersJSON) {
            const users = JSON.parse(usersJSON)
            this.setState({ users })
        }

        this.props.initializeBlogs()
        this.props.initializeUsers()
    }

    handleBlogFieldChange = (e) => {
        this.setState({ [`new_${e.target.name}`]: e.target.value })
    }

    addBlog = async (e) => {
        e.preventDefault()
        this.props.createBlog(
            this.state.new_title,
            this.state.new_author,
            this.state.new_url
        )

        this.setState({
            new_title: '',
            new_author: '',
            new_url: ''
        })

        this.blogForm.toggleVisibility()
    }

    deleteBlog = (id, history) => {

        return () => {
            this.props.deleteBlog(id)
            history.push('/')
        }
    }

    logout = () => {

        this.props.logoutAction()
    }

    render() {

        const findBlogById = (id) => this.props.blogs.find(b => b.id === id)
        const findUserById = (id) => this.state.users.find(u => u.id === id)

        const view = () => {
            if (this.props.login.user === null) {
                return (
                    <div>
                        <LoginForm />
                    </div>
                )
            } else {
    
                const sortByLikes = (blog1, blog2) => blog1.likes > blog2.likes ? -1 : 1
                const sortedBlogs = this.props.blogs.slice().sort(sortByLikes) 
    
                return (
                    <div>
                        <Togglable buttonLabel="create new blog" ref={component => this.blogForm = component}>
                            <BlogForm
                                addBlog={this.addBlog}
                                new_title={this.state.new_title}
                                new_author={this.state.new_author}
                                new_url={this.state.new_url}
                                handleBlogFieldChange={this.handleBlogFieldChange}
                            />
                        </Togglable>
                        
                        <h3>blogs</h3>
                        {sortedBlogs.map(blog =>
                            <div key={blog.id}>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </div>
                        )
                    }
                    </div>
                )
            }
        }

        return (
            <div>
                <Router>
                    <div>
                        <div>
                            <Link to="/blogs">blogs</Link> &nbsp;
                            <Link to="/users">users</Link> &nbsp;
                            {this.props.login.user &&
                                <em>
                                    {this.props.login.user.name} logged in <button onClick={this.logout}>logout</button>
                                </em>
                            }
                        </div>

                        <h2>Blog app</h2>

                        <Notification />
                    
                        <Route exact path="/" render={() => <Redirect to="/blogs" />} />
                        <Route exact path="/blogs" render={() => view()} />
                        <Route exact path="/users" render={() => <UserList users={this.props.users} />} />
                        <Route exact path="/blogs/:id" render={({match, history}) => {

                            if (!this.props.login.user) {
                                return <Redirect to="/" />
                            }

                            const blog = findBlogById(match.params.id)

                            return (<Blog
                                blog={blog}
                                loggedUser={this.props.login.user}
                                handleLike={(e) => this.props.likeBlog(blog)}
                                handleDelete={this.deleteBlog(blog.id, history)}
                            />)
                        }} />

                        <Route exact path="/users/:id" render={({match}) =>
                            <User user={findUserById(match.params.id)} />
                        }/>
                    </div>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        blogs: state.blogs,
        users: state.users,
        login: state.login
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    initializeUsers,
    createBlog,
    deleteBlog,
    likeBlog,
    notify,
    loginAction,
    loginFieldChange,
    isLoggedIn,
    logoutAction
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
