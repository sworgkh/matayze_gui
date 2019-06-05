import React from 'react';
import logo from './logo.png';
import './App.css';
import { Redirect } from "react-router-dom"
import Button from "@material-ui/core/Button";
// import AWS from 'aws-sdk';
import windowSize from 'react-window-size';

const styles = {
  containerStyle: {
    position: 'relative',
    backgroundImage: 'linear-gradient(to bottom right, black, purple)',
    overflow: 'auto',
    minHeight: 980
  },
  logoStyle: {
    position: 'absolute',
    top: 15,
    right: '1%'
  },
  headerStyle: {
    padding: '2%',
    margin: 'auto',
    paddingBottom: 30,
    width: '50%'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      val:'',
      token:''
    }
    this.login = this.login.bind(this)
    this.management_index = this.management_index.bind(this)
    this.hall_index = this.hall_index.bind(this)
    this.interface_index = this.interface_index.bind(this)
    this.redirectUser = this.redirectUser.bind(this)
    this.setToken = this.setToken.bind(this)

  }

  componentDidMount() {
    let a = this.props.location.hash
    a = a.toString().split('&')
    if (a[1]) {
      let token = a[1]
      token = token.slice(13, token.length)
      if (token) {
        let userToken = a[0]
        userToken = userToken.toString().slice(10,userToken.length)
        this.setToken(userToken)
        var url = "https://auth.matayze.shenkar.cloud/oauth2/userInfo";
        var bearer = 'Bearer ' + token;
        fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
            .then(responseJson => {
              // console.log(responseJson);
              this.redirectUser(responseJson)
            })
      }
    }
  }

  redirectUser(userData){
      if (userData.email === 'alarn777@gmail.com' || userData.email === 'sworgkh@gmail.com' || userData.email === 'shohamroditi@gmail.com') {
         this.setState({token: this.state.token, val:'management_index'})
      }
      else {
        this.setState({token: this.state.token, val:'hall_index'})
      }
  }
  setToken(token){
    this.setState({token: token})
  }




  login(){
    this.setState({val:'login'})
  }
  management_index(){
    this.setState({val:'management_index'})
  }

  hall_index(){
    this.setState({val:'hall_index'})
  }
  interface_index(){
    this.setState({val:'interface_index'})
  }




  render() {
    switch (this.state.val) {
      case 'login':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/login',
          state: { logged_in: false,authToken: this.state.token }
        }}/>
      }
      case 'management_index':
      {
        let logged_in = false
        if(this.state.token !== ''){
          logged_in = true
        }
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/management_index',
          state: { logged_in: logged_in, authToken: this.state.token }
        }}/>
      }
      case 'hall_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/hall_index',
          state: { logged_in: false , authToken: this.state.token}
        }}/>
      }
      case 'interface_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/interface_index',
          state: { logged_in: false , authToken: this.state.token }
        }}/>
      }
      default:
        return (
            <div style={styles.containerStyle}>

              <header  style={styles.containerStyle}>
                <h1 style={{position:'center',alignSelf:'center',margin:20,color:'white'}}>Welcome to mataize</h1>
                <img
                    src={logo}
                    style={{
                      position: "relative",
                      left: "95%",
                      marginLeft: "-50px",
                      maxWidth: "7vw",
                      height: "auto",
                      float: 'left'
                    }}
                />
                <p style={{color:'white',margin:10}}>To access login use rout: <Button  variant="outlined" color="primary"  onClick={this.login} style={{color:'white'}}>login</Button></p>
                <p style={{color:'white',margin:10}}>To access management_index use rout: <Button  variant="outlined" color="primary"  onClick={this.management_index} style={{color:'white'}}>management panel</Button></p>
                <p style={{color:'white',margin:10}}>To access hall_index use rout: <Button  variant="outlined" color="primary"  onClick={this.hall_index} style={{color:'white'}}>halls</Button></p>
                <p style={{color:'white',marginLeft:40,marginTop:10}}> To access interface_index use rout: <Button  variant="outlined" color="primary"  onClick={this.interface_index} style={{color:'white'}}>interface</Button></p>
              </header>
            </div>
        );
    }
  }
}

export default windowSize(App);
