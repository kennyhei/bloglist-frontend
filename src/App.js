import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import { connect } from 'react-redux'
import { initializeBlogs, createBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { notify } from './reducers/notificationReducer'

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],

            // Blog fields
            new_title: '',
            new_author: '',
            new_url: '',

            // Login fields
            username: '',
            password: '',
            user: null
        }
    }

    componentWillMount = async () => {

        const usersJSON = window.localStorage.getItem('users')
        const loggedUserJSON = window.localStorage.getItem('loggedUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({ user })
            blogService.setToken(user.token)
        }

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

    handleLoginFieldChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addBlog = async (e) => {
        e.preventDefault()

        this.props.createBlog(
            this.state.new_title,
            this.state.new_author,
            this.state.new_url
        )

        this.props.notify(`A new blog '${this.state.new_title}' by ${this.state.new_author} added`, 'info', 3)

        this.setState({
            new_title: '',
            new_author: '',
            new_url: ''
        })

        this.blogForm.toggleVisibility()
    }

    likeBlog = (id) => {

        return async () => {

            const blog = this.state.blogs.find(b => b.id === id)
            const changedBlog = { ...blog, likes: blog.likes + 1 }

            const updatedBlog = await blogService.update(id, changedBlog)
            
            // Get blogs which weren't affected by the update
            const blogs = this.state.blogs.filter(b => b.id !== id)

            // Add updated blog to blogs
            this.setState({ blogs: blogs.concat(updatedBlog) })
        }
    }

    deleteBlog = (id, history) => {

        return () => {
            this.props.deleteBlog(id)
            history.push('/')
        }
    }

    login = async (e) => {
        e.preventDefault()

        console.log('logging in with', this.state.username, this.state.password)
        try {
            const user = await loginService.login({
              username: this.state.username,
              password: this.state.password
            })

            console.log(user)

            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.setState({
                username: '',
                password: '',
                user })

        } catch (error) {
            this.props.notify('wrong username or password', 'error', 3)
        }
    }

    logout = () => {

        blogService.setToken(null)
        window.localStorage.removeItem('loggedUser')
        this.setState({ user: null })
    }

    render() {

        const findBlogById = (id) => {

            console.log(this.props.blogs)
            const blog = this.props.blogs.find(b => {

                return b.id === id
            })

            return blog
        }

        const findUserById = (id) => this.props.users.find(u => u.id === id)

        const view = () => {
            console.log(this.props.blogs)
            if (this.state.user === null) {
                return (
                    <div>
                        <LoginForm
                            login={this.login}
                            username={this.state.username}
                            password={this.state.password}
                            handleLoginFieldChange={this.handleLoginFieldChange}
                        />
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
                            {this.state.user &&
                                <em>
                                    {this.state.user.name} logged in <button onClick={this.logout}>logout</button>
                                </em>
                            }
                        </div>

                        <h2>Blog app</h2>

                        <Notification />
                    
                        <Route exact path="/" render={() => <Redirect to="/blogs" />} />
                        <Route exact path="/blogs" render={() => view()} />
                        <Route exact path="/users" render={() => <UserList users={this.props.users} />} />
                        <Route exact path="/blogs/:id" render={({match, history}) => {

                            const blog = findBlogById(match.params.id)

                            return (<Blog
                                blog={blog}
                                loggedUser={this.state.user}
                                handleLike={this.likeBlog(blog.id)}
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
        users: state.users
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    initializeUsers,
    createBlog,
    deleteBlog,
    notify
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
