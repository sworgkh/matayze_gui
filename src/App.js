import React from 'react';
import logo from './logo.png';
import './App.css';
import { Redirect } from "react-router-dom"
import Button from "@material-ui/core/Button";
// import AWS from 'aws-sdk';
import windowSize from 'react-window-size';
import AppBarIndex from './appBarIndex'
import styled from "styled-components";

//shahar

import * as serviceWorker from './serviceWorker';
import AppBar from "./Screens/management_interface/components/AppBar";
import Footer from "./footer";




//shahar
export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;


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
      token:'',
      logged_in : false,
      access_token:'',
      userData: {}
    }
    this.login = this.login.bind(this)

    this.halls = this.halls.bind(this)

    this.management_index = this.management_index.bind(this)
    this.hall_index = this.hall_index.bind(this)
    this.interface_index = this.interface_index.bind(this)
    this.redirectUser = this.redirectUser.bind(this)
    this.setToken = this.setToken.bind(this)
    this.logOff = this.logOff.bind(this)
    this.management = this.management.bind(this)
  }

  componentDidMount() {
    console.log(this.props.location)
    if (this.props.location.state) {
      if(!this.props.location.state.logged_in){
        this.logOff()
      } else {
        this.setState({logged_in: false, token: this.props.location.state.authToken, access_token:this.props.location.state.access_token })
        let url = "https://auth.matayze.shenkar.cloud/oauth2/userInfo";
        let bearer = 'Bearer ' + this.props.location.state.access_token
        console.log(bearer)
        fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
            .then(responseJson => {
              console.log(responseJson);
              this.redirectUser(responseJson)
  
              this.setState({logged_in: true, userEmail: responseJson.email})
            })
      }
    } else {


      let a = this.props.location.hash
      a = a.toString().split('&')
      if (a[1]) {
        let token = a[1]
        token = token.slice(13, token.length)
        if (token) {
          let userToken = a[0]
          this.setState({access_token: token})
          userToken = userToken.toString().slice(10, userToken.length)
          this.setToken(userToken)
          let url = "https://auth.matayze.shenkar.cloud/oauth2/userInfo";
          let bearer = 'Bearer ' + token;
          fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': bearer,
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
              .then(responseJson => {
                // console.log(responseJson);
                // this.setState({logged_in: true, userEmail: responseJson.email})
                this.redirectUser(responseJson)
              })
        }
      }
    }
  }


  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }


  redirectUser(userData){

    this.setState({userData:userData})
    console.log(userData.username)
    // this.interface_index()
    // return;
    if(userData.username.toString() === 'Micahel' || userData.username.toString() === 'Admin'){
        console.log('here')
        this.management_index()
        return
    }
      if( userData.username === 'hallA'){
        this.halls()
        return
      }
      if( userData.username === 'hall-screen'){
        this.hall_index()
        return
      }

      this.interface_index()
    }


  setToken(token){
    this.setState({token: token})
  }
  logOff(){
    this.setState({logged_in: false,val:'logoff',
      token:'',userEmail:'',access_token: ''})

    // window.location.href = '/'
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

  halls()
  {
    this.setState({val:'halls'})
  }

  management(buttonWidth){
    if (this.state.userEmail === 'alarn777@gmail.com' || this.state.userEmail === 'sworgkh@gmail.com' || this.state.userEmail === 'shohamroditi@gmail.com' || this.state.userEmail === 'zahor55+testaws@gmail.com' || this.state.userEmail === 'dmun1009@gmail.com'){
      return (
          <p style={{color:'white',margin:30}}><Button  variant="outlined" color="primary" onClick={this.management_index} style={{color:'white',width:buttonWidth}}>management panel</Button></p>
      )
    }
    else {
      return <div/>
    }
  }

  render() {

    let width = this.getWindowDimensions().width
    let buttonWidth = '31%'
    if(width < 1053){
      buttonWidth = '100%'
    }


    let logged_in = false
    if(this.state.token !== ''){
      logged_in = true
    }

    switch (this.state.val) {
      //shahar
      case 'halls':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/halls',
          state: { logged_in: logged_in , userData:this.state.userData, authToken: this.state.token,access_token: this.state.access_token  }
        }}/>
      }
      //shahar
      case 'logoff':
        {
          this.setState({val:''})
          return  <Redirect  to={{
            pathname: '/',
            state: null
          }}/>
        }


      case 'login':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/login',
          state: { logged_in: logged_in, userData:this.state.userData ,authToken: this.state.token,access_token: this.state.access_token  }
        }}/>
      }
      case 'management_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/management_index',
          state: { logged_in: logged_in, userData:this.state.userData,  authToken: this.state.token ,access_token: this.state.access_token }
        }}/>
      }
      case 'hall_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/hall_index',
          state: { logged_in: logged_in , userData:this.state.userData,  authToken: this.state.token,access_token: this.state.access_token }
        }}/>
      }
      case 'interface_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/interface_index',
          state: { logged_in: logged_in , userData:this.state.userData,  authToken: this.state.token, userEmail: this.state.userEmail, access_token: this.state.access_token }
        }}/>
      }
      default:
        if(this.state.logged_in){
          return (
              <div style={styles.containerStyle}>
                <AppBarIndex
                    userEmail={this.state.userEmail}
                    logged_in={this.state.logged_in}
                    logOff = {this.logOff}
                />
                <header  style={styles.containerStyle}>
                  <h1 style={{position:'center',alignSelf:'center',margin:20,color:'white'}}>Welcome to mataize</h1>
                  {/*<p style={{color:'white',margin:30}}>To access login use rout: <Button  variant="outlined" color="primary"  onClick={this.login} style={{color:'white'}}>login</Button></p>*/}
                  {this.management(buttonWidth)}

                  <p style={{color:'white',margin:30}}><Button   variant="outlined" color="primary"  onClick={this.hall_index} style={{color:'white',width:buttonWidth}}>hall index</Button></p>
                  <p style={{color:'white',margin:30}}><Button  variant="outlined" color="primary"  onClick={this.interface_index} style={{color:'white',width:buttonWidth}}>interface</Button></p>
                  <p style={{color:'white',margin:30}}><Button  variant="outlined" color="primary"  onClick={this.halls} style={{color:'white',width:buttonWidth}}>halls</Button></p>
                </header>
                {/*<Footer/>*/}
              </div>
          );
        }
        else {


          return (
              <div style={styles.containerStyle}>
                <AppBarIndex
                    userEmail={this.state.userEmail}
                    logged_in={this.state.logged_in}
                    logOff={this.logOff}
                />
                <header style={styles.containerStyle}>
                  <h1 style={{position: 'center', alignSelf: 'center', margin: 20, color: 'white'}}>Welcome to
                    mataize</h1>
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
                  <p style={{color: 'white', margin: 10}}>Please login first </p>
                </header>
                {/*<Footer/>*/}
              </div>
          );
        }
    }
  }
}

export default windowSize(App);
