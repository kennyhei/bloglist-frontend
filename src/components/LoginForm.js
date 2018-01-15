import React from 'react'
import { connect } from 'react-redux'
import { loginAction } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

const LoginForm = (props) => {

    const login = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        
        e.target.username.value = ''
        e.target.password.value = ''

        props.loginAction(username, password)
    }

    return (
        <div>
            <h2>Log in to application</h2>

            <Form onSubmit={login}>
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
                <Button type="submit">Login</Button>
            </Form>
            <div>no account? <Link to="/signup">register</Link></div>
        </div>
    )
}

const mapDispatchToProps = {
    loginAction
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm
