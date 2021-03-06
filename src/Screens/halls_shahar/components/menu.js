import React, { Component } from 'react'
import '../css/lecture.css'
import Lectures from '../components/lectures'
import Button from "@material-ui/core/Button";
import env_vars from "../../../../src/ENV_VAR";
import { Redirect } from "react-router-dom"

const login_url = 'https://auth.matayze.shenkar.cloud/login?response_type=token&client_id=3uslmcib25uq3sah74hp6lgvr9&redirect_uri=http://localhost:3000&scope=openid+profile+aws.cognito.signin.user.admin'
const styles= {

    container:{
        overflow: "auto",
        minHeight:800,
        background: "linear-gradient(to right bottom, black, purple)",
        color:'white'
    },
    buttons: {
        textAlign:"center"
    }
}

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            room:null,
            isVisible: true,
            logged_in:false,
            token:'',
            lectures:[],     //all lectures,
            messages:[],
            back:false
        }
        this.checkRoom = this.checkRoom.bind(this)
        this.login = this.login.bind(this)
        this.toggleButtons = this.toggleButtons.bind(this)
    }

    componentDidMount(){
        if(this.state.token !== ''){
            return
        }

        // if(this.state.token !== ''){
        if(this.props.location.state.authToken){
            this.setState({logged_in:true})
            this.setState({token: this.props.location.state.authToken})
            //all lectures will be fetched here
            let url = env_vars.api_link_get;

            let bearer = 'Bearer ' + this.props.location.state.authToken;
            fetch(url, {
                method: 'GET',
                crossDomain: true,
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(responseJson => {
                    //console.log(responseJson.data);
                    this.dealWithData(responseJson.data)

                })

            //get all messages
            this.setState({messages: []})
            url = env_vars.message_link + 'messages'
            fetch(url, {
                method: 'POST',
                crossDomain: true,
                body: JSON.stringify({
                    "type":"getAll",
                    "title":"test",
                    "message":"test"
                }),
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                    this.setState({messages : responseJson.data})
                })





        }
        else{
            this.setState({logged_in:false})
        }
    }

    dealWithData = (data) => {
        console.log(data)
        this.setState({
            lectures: data
        })

        //console.log(this.state.lectures)
    }


    login(){
        window.location.href = login_url;
    }

    setToken(token){
        this.setState({token: token})
    }

    checkRoom(hall)
    {
        this.setState({isVisible:false})
        this.setState({room:hall})
    }

    toggleButtons()
    {
        this.setState({isVisible:true})
    }

    back =() =>{
        this.setState({back:true})
    }

    render()
    {
        if(this.state.back){
            return  <Redirect  to={{
                pathname: '/',
                state: { logged_in: false ,authToken: null, access_token:  null}
            }}/>
        }

        if(this.state.logged_in)
        {
            return(
                <div className="menu" style={styles.container}>
                    {this.state.isVisible?

                        <div className="buttons" style={styles.buttons}>
                            <h2 style={{margin:5}}>Choose a room:</h2>
                            <Button variant="outlined" color='primary' style={{color:'white',margin:10}} onClick={() => this.checkRoom("A")}>Room A</Button><br/>
                            <Button variant="outlined" color='primary' style={{color:'white',margin:10}} onClick={() => this.checkRoom("B")}>Room B</Button><br/>
                            <Button variant="outlined" color='primary' style={{color:'white',margin:10}} onClick={() => this.checkRoom("C")}>Room C</Button><br/>
                            <Button variant="outlined" color="primary" onClick={() => {
                                this.back()

                            }} style={{position:'absolute',left:'10px',top:'10px', color: 'darkpink'}}>Log out</Button>
                        </div>:
                        <div>
                            {this.state.room!==null? <Lectures toggleButtons={this.toggleButtons} token={this.props.location.state.authToken} room={this.state.room} lectures={this.state.lectures} messages={this.state.messages}/> : null}
                        </div>}


                </div>
            )
        }
        else{
            return(
                <div className="lecture" style={styles.container}>
                    <Button onClick={this.login} style={{color:'white'}}>Login</Button>
                </div>
            )
        }

    }
}
export default Menu