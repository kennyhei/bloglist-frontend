import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

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

            <Form onSubmit={register}>
                <Form.Field>
                    <label>Username</label>
                    <input type="text"
                           name="username"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type="password"
                           name="password"
                    />
                </Form.Field>
                <Button type="submit">Register</Button>
            </Form>
            <div>already have account? <Link to="/">login</Link></div>
        </div>
    )
}

const mapDispatchToProps = {
    createUser
}

const ConnectedRegisterForm = connect(null, mapDispatchToProps)(RegisterForm)

export default ConnectedRegisterForm
