import React, {useState} from 'react'
import '../styles/Registration.less'

const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [dateOfBirth, setDateofBirth] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (e) => {
        setFirstName(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setSurname(e.target.value)
    }

    const handleDateOfBirthChange = (e) => {
        setDateofBirth(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const registerUser = (e) => {
        //This doesn't do anything yet. Will send the use data to the database.
        e.preventDefault()
        console.log(firstName)
        console.log(surname)
        console.log(dateOfBirth)
        console.log(email)
    }

    return(
        <div className='registration-form'>
            <form method='post' action='#' autocomplete='off'>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" 
                        className="form-control"
                        id="usernameInput"
                        value={firstName}
                        onChange={e => handleUsernameChange(e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" 
                        className="form-control"
                        id="passwordInput"
                        value={surname}
                        onChange={e => handlePasswordChange(e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="dobInput">Date of Birth</label>
                    <input type="date" 
                        className="form-control"
                        
                        id="dobInput"
                        value={dateOfBirth}
                        onChange={e => handleDateOfBirthChange(e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" 
                        className="form-control"
                        
                        id="emailInput"
                        value={email}
                        onChange={e => handleEmailChange(e)}
                    ></input>
                </div>
                <button className='btn btn-primary' onClick={registerUser}>Register</button>
            </form>
        </div>
    )
}

export default Registration