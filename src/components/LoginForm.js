import React from 'react'
import { connect } from 'react-redux'
import { loginAction, loginFieldChange } from '../reducers/loginReducer'

const LoginForm = (props) => {
    
    const handleLoginFieldChange = (e) => {

        props.loginFieldChange([e.target.name], e.target.value)
    }

    const login = (e) => {
        e.preventDefault()

        console.log('logging in with', props.login.username, props.login.password)
        const username = props.login.username
        const password = props.login.password

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
                           value={props.login.username}
                           onChange={handleLoginFieldChange}
                    />
                </div>
                <div>
                    Password:
                    <input type="password"
                           name="password"
                           value={props.login.password}
                           onChange={handleLoginFieldChange}
                    />
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {

    console.log(state)
    return {
        login: state.login
    }
}

const mapDispatchToProps = {
    loginAction,
    loginFieldChange
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm
