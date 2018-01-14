import React from 'react'
import { connect } from 'react-redux'
import { loginAction } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

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

            <form onSubmit={login}>
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
                <Button bsSize="small" type="submit">Login</Button>
            </form>
            <div>no account? <Link to="/signup">register</Link></div>
        </div>
    )
}

const mapDispatchToProps = {
    loginAction
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm
