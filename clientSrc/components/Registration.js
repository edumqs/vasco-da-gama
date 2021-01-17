import React, { useState } from 'react';
import '../styles/Registration.less';
import axios from 'axios';

export default function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleChanges = (formItemBeingUpdated, e) => {
        switch (formItemBeingUpdated) {
        case 'firstName':
            setFirstName(e.target.value);
            break;
        case 'lastName':
            setLastName(e.target.value);
            break;
        case 'password':
            setPassword(e.target.value);
            break;
        case 'email':
            setEmail(e.target.value);
            break;
        default:
        // do nothing
        }
    };

    async function registerUser(e) {
        e.preventDefault();
        const registrationData = {
            firstName,
            lastName,
            email,
            password
        };
        try {
            const response = await axios.post('http://localhost:9002/api/1/auth/register', registrationData);
            // eslint-disable-next-line no-console
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='registration-form'>
            <form method='post' action='#' autoComplete='off'>
                <div className="form-group">
                    <label htmlFor="firstNameInput">First Name</label>
                    <input type="text"
                        className="form-control"
                        id="firstNameInput"
                        value={firstName}
                        onChange={e => handleChanges('firstName', e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="lastNameInput">Last Name</label>
                    <input type="text"
                        className="form-control"
                        id="lastNameInput"
                        value={lastName}
                        onChange={e => handleChanges('lastName', e)}
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
    );
}
