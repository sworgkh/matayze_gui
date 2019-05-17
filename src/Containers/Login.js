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
        minHeight: "1000px",
        justifyContent:'center',
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
        };
    }


    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = async event => {
        event.preventDefault();


        // this.userHasAuthenticated(true);
        this.setState({isAuthenticated:true})

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
            {/*    <h1 style={{marginLeft:10,color:'black'}}> AWS Cognito Login</h1>*/}
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
                        <Image style={{margin:10,height:200}} src={Logo} alt=""/>
                        </div>
                    <FormGroup controlId="email">
                        <TextField
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

