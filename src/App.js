import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import MenuInverted from './components/MenuInverted'
import BlogList from './components/BlogList'

import { connect } from 'react-redux'
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { notify } from './reducers/notificationReducer'
import { isLoggedIn } from './reducers/loginReducer'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // Blog fields
            new_title: '',
            new_author: '',
            new_url: ''
        }
    }

    componentWillMount = async () => {

        this.props.isLoggedIn()
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

    render() {

        console.log(this.props.users)

        const findBlogById = (id) => this.props.blogs.find(b => b.id === id)
        const findUserById = (id) => this.props.users.find(u => u.id === id)

        const view = () => {
            if (this.props.loggedUser === null) {
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
                        <Togglable buttonLabel="Create new blog" ref={component => this.blogForm = component}>
                            <BlogForm
                                addBlog={this.addBlog}
                                new_title={this.state.new_title}
                                new_author={this.state.new_author}
                                new_url={this.state.new_url}
                                handleBlogFieldChange={this.handleBlogFieldChange}
                            />
                        </Togglable>
                        
                        <h3>Blogs</h3>
                        <BlogList blogs={sortedBlogs} />
                    </div>
                )
            }
        }

        return (
            <div className="ui container">
                <Router>
                    <div>
                        <div>
                            <MenuInverted loggedInUser={this.props.loggedUser} />
                        </div>

                        <h2>Blog app</h2>

                        <Notification />
                    
                        <Route exact path="/" render={() => <Redirect to="/blogs" />} />
                        <Route exact path="/signup" render={({history}) => <RegisterForm history={history} />} />
                        <Route exact path="/blogs" render={() => view()} />
                        <Route exact path="/users" render={() => <UserList users={this.props.users} />} />
                        <Route exact path="/blogs/:id" render={({match, history}) => {

                            if (!this.props.loggedUser) {
                                return <Redirect to="/" />
                            }

                            const blog = findBlogById(match.params.id)

                            return (<Blog
                                blog={blog}
                                loggedUser={this.props.loggedUser}
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
        loggedUser: state.loggedUser
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    initializeUsers,
    createBlog,
    deleteBlog,
    likeBlog,
    notify,
    isLoggedIn
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
