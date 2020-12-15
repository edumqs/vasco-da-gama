import React, {useState} from 'react'
import '../styles/Login.less'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const loginUser = (e) => {
        //This doesn't do anything yet. Will check username and password 
        //against the database, and allow access if match.
        e.preventDefault()
        console.log(username)
        console.log(password)
    }

    return(
        <div className='login-form'>
            <form method='post' action='#' autocomplete='off'>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" 
                        className="form-control"
                        id="usernameInput"
                        value={username}
                        onChange={e => handleUsernameChange(e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" 
                        className="form-control"
                        id="passwordInput"
                        value={password}
                        onChange={e => handlePasswordChange(e)}
                    ></input>
                </div>
                <button className='btn btn-primary' onClick={loginUser}>Login</button>
            </form>
        </div>
    )
}

export default Login