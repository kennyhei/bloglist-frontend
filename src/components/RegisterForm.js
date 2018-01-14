import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const RegisterForm = (props) => {

    const register = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        
        e.target.username.value = ''
        e.target.password.value = ''

        props.createUser(username, password)
        props.history.push('/')
    }

    return (
        <div>
            <h2>Register</h2>

            <form onSubmit={register}>
                <div>
                    Username:
                    <input type="text"
                           name="username"
                    />
                </div>
                <div>
                    Password:
                    <input type="password"
                           name="password"
                    />
                </div>
                <Button bsSize="small" type="submit">Register</Button>
            </form>
            <div>already have account? <Link to="/">login</Link></div>
        </div>
    )
}

const mapDispatchToProps = {
    createUser
}

const ConnectedRegisterForm = connect(null, mapDispatchToProps)(RegisterForm)

export default ConnectedRegisterForm
