import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom"
const styles = {
    containerStyle: {
        // position: 'relative',
        backgroundImage: 'linear-gradient(to bottom right, black, purple)',
        height: "1000px",
        justifyContent:'center',
        margin: 10

    }
}





export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            // login:false,
            isAuthenticated: false
        };
    }




    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = async event => {
        event.preventDefault();


        this.userHasAuthenticated(true);
        this.setState({isAuthenticated:true})

        // try {
        //     await Auth.signIn(this.state.email, this.state.password);
        //     this.userHasAuthenticated(true)
        // } catch (e) {
        //     alert(e.message);
        // }
    }





    render() {

        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };


        if(!this.state.isAuthenticated){
        return (
            <div style={{justifyContent:'center', margin: 10}} className="Login">
                <h1> AWS Cognito Login</h1>

                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email">
                        <TextField
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
                        size="small"
                        color="primary"
                        onClick={this.handleSubmit}

                    >
                        Login
                    </Button>
                </form>
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

