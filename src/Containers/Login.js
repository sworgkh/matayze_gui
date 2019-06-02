import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom"
import Paper from "@material-ui/core/Paper";
import Logo from '../Screens/management_interface/assets/logo.png'
import Image from "react-bootstrap/Image";

const styles = {
    containerStyle: {
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom right, black, purple)',
        minHeight: "800px",
        // justifyContent:'center',
        textColor:'white',
        zIndex: 9999
    }
}





export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isAuthenticated: false,
            error:false
        };
    }


    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = async event => {
        event.preventDefault();
        if(this.state.email === "michael@gmail.com" &&  this.state.password === '1') {
            this.setState({isAuthenticated: true})

        }
        else {
            this.setState({password: '', error: true})
        }




        // try {
        //     await Auth.signIn(this.state.email, this.state.password);
        //     this.userHasAuthenticated(true)
        // } catch (e) {
        //     alert(e.message);
        // }
    }

    // componentWillUnmount() {
    //     this.setState({isAuthenticated:false})
    // }


    render() {
        if(!this.state.isAuthenticated){
        return (
            <div style={styles.containerStyle} className="Login">
                    <Paper style={{
                        alignContent: 'center',
                        backgroundImage: 'linear-gradient(to bottom right, gold, lightblue)',
                    }} >
                        <div style={{ display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent:'space-between',
                            alignContent: 'space-between'
                        }}
                             >
                        <h1 style={{marginLeft:10,color:'black'}}> AWS Cognito Login</h1>
                        <Image style={{margin:10,height:70}} src={Logo} alt=""/>
                        </div>
                    <FormGroup controlId="email">
                        <TextField
                            error={this.state.error}
                            style={{marginLeft:10,color:'black'}}
                            id="outlined-name"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <TextField
                            error={this.state.error}
                            style={{marginLeft:10,color:'black'}}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            autoComplete="current-password"
                            onChange={this.handleChange('password')}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormGroup>
                    <Button
                        style={{margin:10}}
                        size="small"
                        color="primary"
                        onClick={this.handleSubmit}
                    >
                        Login
                    </Button>
                    </Paper>
           </div>
        );
            }
        else {
            return <Redirect  to={{
                pathname: '/management_index',
                state: { logged_in: true }
            }}/>
        }
    }
}

                                                    //AWS example code
// var WildRydes = window.WildRydes || {};
// WildRydes.map = WildRydes.map || {};
//
// (function rideScopeWrapper($) {
//     var authToken;
//     WildRydes.authToken.then(function setAuthToken(token) {
//         if (token) {
//             authToken = token;
//         } else {
//             window.location.href = '/signin.html';
//         }
//     }).catch(function handleTokenError(error) {
//         alert(error);
//         window.location.href = '/signin.html';
//     });
//     function requestUnicorn(pickupLocation) {
//         $.ajax({
//             method: 'POST',
//             url: _config.api.invokeUrl + '/ride',
//             headers: {
//                 Authorization: authToken
//             },
//             data: JSON.stringify({
//                 PickupLocation: {
//                     Latitude: pickupLocation.latitude,
//                     Longitude: pickupLocation.longitude
//                 }
//             }),
//             contentType: 'application/json',
//             success: completeRequest,
//             error: function ajaxError(jqXHR, textStatus, errorThrown) {
//                 console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
//                 console.error('Response: ', jqXHR.responseText);
//                 alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
//             }
//         });
//     }
//
//     function completeRequest(result) {
//         var unicorn;
//         var pronoun;
//         console.log('Response received from API: ', result);
//         unicorn = result.Unicorn;
//         pronoun = unicorn.Gender === 'Male' ? 'his' : 'her';
//         displayUpdate(unicorn.Name + ', your ' + unicorn.Color + ' unicorn, is on ' + pronoun + ' way.');
//         animateArrival(function animateCallback() {
//             displayUpdate(unicorn.Name + ' has arrived. Giddy up!');
//             WildRydes.map.unsetLocation();
//             $('#request').prop('disabled', 'disabled');
//             $('#request').text('Set Pickup');
//         });
//     }
//
//     // Register click handler for #request button
//     $(function onDocReady() {
//         $('#request').click(handleRequestClick);
//         $('#signOut').click(function() {
//             WildRydes.signOut();
//             alert("You have been signed out.");
//             window.location = "signin.html";
//         });
//         $(WildRydes.map).on('pickupChange', handlePickupChanged);
//
//         WildRydes.authToken.then(function updateAuthMessage(token) {
//             if (token) {
//                 displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
//                 $('.authToken').text(token);
//             }
//         });
//
//         if (!_config.api.invokeUrl) {
//             $('#noApiMessage').show();
//         }
//     });
//
//     function handlePickupChanged() {
//         var requestButton = $('#request');
//         requestButton.text('Request Unicorn');
//         requestButton.prop('disabled', false);
//     }
//
//     function handleRequestClick(event) {
//         var pickupLocation = WildRydes.map.selectedPoint;
//         event.preventDefault();
//         requestUnicorn(pickupLocation);
//     }
//
//     function animateArrival(callback) {
//         var dest = WildRydes.map.selectedPoint;
//         var origin = {};
//
//         if (dest.latitude > WildRydes.map.center.latitude) {
//             origin.latitude = WildRydes.map.extent.minLat;
//         } else {
//             origin.latitude = WildRydes.map.extent.maxLat;
//         }
//
//         if (dest.longitude > WildRydes.map.center.longitude) {
//             origin.longitude = WildRydes.map.extent.minLng;
//         } else {
//             origin.longitude = WildRydes.map.extent.maxLng;
//         }
//
//         WildRydes.map.animate(origin, dest, callback);
//     }
//
//     function displayUpdate(text) {
//         $('#updates').append($('<li>' + text + '</li>'));
//     }
// }(jQuery));
//
