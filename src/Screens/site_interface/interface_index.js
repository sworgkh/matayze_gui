import React from 'react'
import Header from './components/header'
import Schedule from './components/events'
import { Redirect } from 'react-router-dom'
import AppBarIndex from '../../appBarIndex'
import Button from "@material-ui/core/Button"

const styles = {
    containerStyle: {
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom right, black, purple)',
        overflow: 'auto',
        minHeight: 780
    },
    headerStyle: {
        padding: '2%',
        margin: 'auto',
        paddingBottom: 45,
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
                    userEmail: '',
                    authToken: '',
                    access_token: ''
                }
            }
        }

        this.logOff = this.logOff.bind(this)
    }

    componentDidMount() {
        this.setState({location: this.props.location})
    }

    back = () => {
        this.setState({back:true})
    }

    logOff(){
        this.setState({location: {state: {logged_in: false,authToken: '',access_token:'',userEmail:''}}})
    }

    render() {
        if(this.state.back) {
            return  <Redirect  to={{
                pathname: '/',
                state: { 
                    logged_in: this.state.location.state.logged_in,
                    authToken: this.state.location.state.authToken,
                    access_token:  this.state.location.state.access_token
                }
            }}/>        
        }
        
        return (
            <div style={styles.containerStyle}>
                <AppBarIndex
                    userEmail= {this.state.location.state.userEmail}
                    logged_in= {this.state.location.state.logged_in}
                    logOff = {this.logOff}
                />
                <Button style={styles.backStyle} variant="outlined" color="primary" onClick={() => this.back()}>BACK</Button>
                <Header style={styles.headerStyle} />
                <Schedule location = {this.props.location} />
            </div>
        )
    }
}