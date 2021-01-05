import React, { useState } from 'react';
import '../styles/Map.less';

export default function Map() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    function getCoordinates(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    function handleLocationError(error) {
        switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred');
            break;
        default:
            alert('An unknown error occurred');
        }
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
        } else {
            alert('GeoLocation is not supported by this broswer.');
        }
    }

    return (
        <div className="map">
            <h2>Geolocation Map</h2>
            <button onClick={getLocation}>Get coordinates</button>
            <h4>Your Coordinates</h4>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            {
                latitude && longitude ?
                    <img src={`https://maps.googleapis.com/maps/api/staticmap?
                    center=${latitude},${longitude}
                    &zoom=13&size=600x300&sensor=false&markers=color:red%7C
                    ${latitude},${longitude}&key=
                    ${'AIzaSyDjnrsA63AakTNIlvkazn8T_dX58KqRlAg'}`}
                    alt='Google Map Location' /> :
                    null
            }
        </div>
    );
}
