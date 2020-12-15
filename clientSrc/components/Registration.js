import React, {useState} from 'react'

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
        <div className='registrationForm'>
            <form method='post' action='#' autocomplete='off'>
                <div class="form-group">
                    <label for="usernameInput">Username</label>
                    <input type="text" 
                        class="form-control"
                        id="usernameInput"
                        value={firstName}
                        onChange={e => handleUsernameChange(e)}
                    ></input>
                </div>
                <div class="form-group">
                    <label for="passwordInput">Password</label>
                    <input type="password" 
                        class="form-control"
                        id="passwordInput"
                        value={surname}
                        onChange={e => handlePasswordChange(e)}
                    ></input>
                </div>
                <div class="form-group">
                    <label for="dobInput">Date of Birth</label>
                    <input type="date" 
                        class="form-control"
                        
                        id="dobInput"
                        value={dateOfBirth}
                        onChange={e => handleDateOfBirthChange(e)}
                    ></input>
                </div>
                <div class="form-group">
                    <label for="emailInput">Email</label>
                    <input type="email" 
                        class="form-control"
                        
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