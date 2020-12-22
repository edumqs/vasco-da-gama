import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Profile.less';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // const [checkedIn, setCheckedIn] = useState(false);
    const [checkedInLocation, setCheckedInLocation] = useState('');
    // const [checkedInDuration, setCheckedInDuration] = useState('0:00');

    // eslint-disable-next-line no-unused-vars
    const retrieveUserData = (() => {
        // Must retrieve the specific user from database
        axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => {
                const user = res.data;
                setUsername(user.username);
                setEmail(user.email);
                setCheckedInLocation(user.address.city);
            });
    })();

    return (
        <div className ='profile-card'>
            <img className='profile-picture' src='https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d'></img> 
            <div className='label'>
                <h5>username</h5>
                <h2>{username}</h2>
            </div>
            <div className='label'>
                <h5>email</h5>
                <h2>{email}</h2>
            </div>
            <div className='label'>
                <h5>checked-in location</h5>
                <h2>{checkedInLocation}</h2>
            </div>
            <div className='label'>
                <h5>time checked-in</h5>
                <h2>7:23</h2>
            </div>
        </div>
    );
};

export default Profile;
