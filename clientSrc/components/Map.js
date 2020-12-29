// see this tutorial: https://www.youtube.com/watch?v=U3dLjHN0UvM

/* eslint-disable no-alert */
import React from 'react';
import '../styles/Map.less';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            userAddress: null
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert('Geoloation is not supported by this broswer.');
        }
    }

    getCoordinates(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    handleLocationError(error) {
        switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('user denied the request for Geolocation');
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

    render() {
        return (
            <div className="map">
                <h2>Geolocation Map</h2>
                <button onClick={this.getLocation}>Get coordinates</button>
                <h4>Your Coordinates</h4>
                <p>Latitude: {this.state.latitude}</p>
                <p>Longitude: {this.state.longitude}</p>
                {
                    this.state.latitude && this.state.longitude ?
                        <img src={`https://maps.googleapis.com/maps/api/staticmap?
                        center=${this.state.latitude},${this.state.longitude}
                        &zoom=13&size=600x300&sensor=false&markers=color:red%7C
                        ${this.state.latitude},${this.state.longitude}&key=
                        ${'AIzaSyDjnrsA63AakTNIlvkazn8T_dX58KqRlAg'}`}
                        alt='Google Map Location' /> :
                        null
                }
            </div>
        );
    }
}

export default Map;
