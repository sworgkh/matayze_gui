import React from 'react'
import Header from './components/header'
import Schedule from './components/events'
import { Redirect } from 'react-router-dom'
import AppBarIndex from '../../appBarIndex'
import Messages from './components/messages'

const styles = {
    containerStyle: {
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom right, black, purple)',
        overflow: 'auto',
        minHeight: 1200
    },
    headerStyle: {
        padding: '2%',
        margin: 'auto',
        width: '50%'
    },
    backStyle: {
        position: 'absolute',
        top: 85,
        left: 10,
        height: 50,
        color: 'white'
    }
}

export default class interface_index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            back: false,
            location: {
                state: {
                    logged_in: false,
                    userData: {
                        email: ''
                    },
                    authToken: '',
                    access_token: ''
                }
            }
        }

        this.logOff = this.logOff.bind(this)
        this.messagesScreen = this.messagesScreen.bind(this)
    }

    componentWillMount(){
        this.setState({location: this.props.location})
    }

    logOff(){
        this.setState({back: true, location: {state: {logged_in: false,authToken: '',access_token:'', userData: {email:''}}}})
    }

    messagesScreen() {

        this.setState({
            messages_screen: !this.state.messages_screen
        });
    }

    render() {
        if(this.state.back) {
            return  <Redirect  to={{
                pathname: '/',
                state: { 
                    logged_in: this.state.location.state.logged_in,
                    authToken: this.props.location.state.authToken,
                    access_token:  this.props.location.state.access_token
                }
            }}/>        
        }

        if (this.props.location.state === undefined || !this.state.location.state.logged_in) {
            return <Redirect
                to={{
                    pathname: '/login',
                    state: { logged_in: false }
                }} />
          }
        
        return (
            <div style={styles.containerStyle}>
                <AppBarIndex
                    userEmail= {this.state.location.state.userData.email}
                    logged_in= {this.state.location.state.logged_in}
                    logOff = {this.logOff}
                />
                <Header style={styles.headerStyle} />
                <Messages token={this.props.location.state.authToken} />
                
                <Schedule location = {this.props.location} />
                
            </div>
        )
    }
}