import React from 'react';
import '../styles/Profile.less';

export default function Profile(props) {
    return (
        <div className='profile-container'>
            <div className ='profile-card'>
                <img className='profile-picture' src='https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d'></img> 
                <div className='label'>
                    <h5>username</h5>
                    <h2>{props.user}</h2>
                </div>
                {/* <div className='label'>
                    <h5>email</h5>
                    <h2>{props.user.email}</h2>
                </div> */}
                {/* <div className='label'>
                    <h5>checked-in location</h5>
                    <h2>{props.user.address.city}</h2>
                </div> */}
                <div className='label'>
                    <h5>time checked-in</h5>
                    <h2>7:23</h2>
                </div>
                <a className='btn btn-success' href='/map'>See current location</a>
            </div>
        </div>
    );
}

