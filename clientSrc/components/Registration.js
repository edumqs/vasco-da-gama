import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../styles/Registration.less';

export default function Registration() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
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
        case 'username':
            setUsername(e.target.value);
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

    const redirectToLoginPageAfterRegistering = () => {
        history.push('./login');
    };

    async function registerUser(e) {
        e.preventDefault();
        const usernameAndPassword = {
            username,
            password
        };
        const authEndpoint = 'https://app.yawe.dev/api/1/ce/registering-users?key=1f8d0c6bbd604833adfa5d2cf8095ef4';
        try {
            const registeredUser = await axios.post(authEndpoint, usernameAndPassword);
            console.log(registeredUser.data.data);
            redirectToLoginPageAfterRegistering();
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
                    <label htmlFor="lastNameInput">Username</label>
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
