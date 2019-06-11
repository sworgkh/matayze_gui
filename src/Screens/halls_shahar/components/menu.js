import React, { Component } from 'react'
import '../css/lecture.css'
import Lectures from '../components/lectures'
import Button from "@material-ui/core/Button";
import 'bootstrap/dist/css/bootstrap.css';
import env_vars from "../../../ENV_VAR";


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
            lectures:[]     //all lectures
        }
        this.checkRoom = this.checkRoom.bind(this)
        this.login = this.login.bind(this)
    }

    componentDidMount(){

        console.log(this.props)
        // this.setState({logged_in: this.props.location.state.logged_in, token: this.props.location.state.authToken})


        if(this.props.location.state.authToken){
            this.setState({logged_in:true})
            //all lectures will be fetched here
            let url = env_vars.api_link_get;

            // let url = "https://h4vq14noj4.execute-api.eu-west-1.amazonaws.com/prod/lectures";
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

        }
        else{
            this.setState({logged_in:false})
        }
    }

    dealWithData = (data) => {
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
    render()
    {
        if(this.state.logged_in)
        {
        return(
            <div className="menu" style={styles.container}>
            {this.state.isVisible? 
                <div className="buttons" style={styles.buttons}> 
                <h3>Choose room:</h3>
                <button className="btn btn-light" onClick={() => this.checkRoom("A")}>Room A</button><br/><br/>
                <button className="btn btn-light" onClick={() => this.checkRoom("B")}>Room B</button><br/><br/>
                <button className="btn btn-light" onClick={() => this.checkRoom("C")}>Room C</button></div>:
                <div>
            {this.state.room!==null? <Lectures room={this.state.room} lectures={this.state.lectures}/> : null}
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