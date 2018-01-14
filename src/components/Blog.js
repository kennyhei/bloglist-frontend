import React from 'react'

class Blog extends React.Component {
    constructor(props) {
        super(props)

        this.blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }
    }

    render() {
        let showDeleteButton = false

        if (!this.props.blog.user) {
            showDeleteButton = true
        }

        if (this.props.blog.user && this.props.loggedUser.username === this.props.blog.user.username) {
            showDeleteButton = true
        }
        
        return (
            <div style={this.blogStyle}>
                <div className="header">
                    <b>{this.props.blog.title}</b> – <i>{this.props.blog.author}</i>
                </div>
                <div className="details">
                    <table>
                        <tbody>
                            <tr><td>{this.props.blog.url}</td></tr>
                            <tr><td>{this.props.blog.likes} likes <button onClick={this.props.handleLike}>like</button></td></tr>
                            <tr><td>added by {this.props.blog.author}</td></tr>
                            {showDeleteButton &&
                            <tr><td><button onClick={this.props.handleDelete}>delete</button></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Blog
