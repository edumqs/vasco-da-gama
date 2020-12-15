import React, {useState} from 'react'

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
        <div className='loginForm'>
            <form method='post' action='#' autocomplete='off'>
                <div class="form-group">
                    <label for="usernameInput">Username</label>
                    <input type="text" 
                        class="form-control"
                        id="usernameInput"
                        value={username}
                        onChange={e => handleUsernameChange(e)}
                    ></input>
                </div>
                <div class="form-group">
                    <label for="passwordInput">Password</label>
                    <input type="password" 
                        class="form-control"
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