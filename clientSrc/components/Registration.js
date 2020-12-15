import React, {useState} from 'react'
import '../styles/Registration.less'

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateofBirth] = useState('');
    const [email, setEmail] = useState('');

    const handleChanges = (formItemBeingUpdated, e) => {
        switch(formItemBeingUpdated){
            case 'username':
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            case 'dateOfBirth':
                setDateofBirth(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
        }
    }

    const registerUser = (e) => {
        //This doesn't do anything yet. Will send the user data to the database.
        e.preventDefault()
        console.log(username)
        console.log(password)
        console.log(dateOfBirth)
        console.log(email)
    }

    return(
        <div className='registration-form'>
            <form method='post' action='#' autoComplete='off'>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" 
                        className="form-control"
                        id="usernameInput"
                        value={username}
                        onChange={e => handleChanges('username', e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" 
                        className="form-control"
                        id="passwordInput"
                        value={password}
                        onChange={e => handleChanges('password', e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="dobInput">Date of Birth</label>
                    <input type="date" 
                        className="form-control"
                        id="dobInput"
                        value={dateOfBirth}
                        onChange={e => handleChanges('dateOfBirth', e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" 
                        className="form-control"
                        id="emailInput"
                        value={email}
                        onChange={e => handleChanges('email', e)}
                    ></input>
                </div>
                <button className='btn btn-primary' onClick={registerUser}>Register</button>
            </form>
        </div>
    )
}

export default Registration