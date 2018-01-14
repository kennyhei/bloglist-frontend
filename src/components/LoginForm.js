import React from 'react'

const LoginForm = ({ login, username, password, handleLoginFieldChange }) => {
    
    return (
        <div>
            <h2>Log in to application</h2>

            <form onSubmit={login}>
                <div>
                    Username:
                    <input type="text"
                           name="username"
                           value={username}
                           onChange={handleLoginFieldChange}
                    />
                </div>
                <div>
                    Password:
                    <input type="password"
                           name="password"
                           value={password}
                           onChange={handleLoginFieldChange}
                    />
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm
