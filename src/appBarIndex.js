import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Logo from './logo.png'
import Avatar from "@material-ui/core/Avatar";
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import logo from './logo.png';


const styles = theme => ({
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    // sectionDesktop: {
    //     display: 'none',
    //     [theme.breakpoints.up('md')]: {
    //         display: 'flex',
    //     },
    // },
    // sectionMobile: {
    //     display: 'flex',
    //     [theme.breakpoints.up('md')]: {
    //         display: 'none',
    //     },
    // },
});

class PrimarySearchAppBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: false,
            AWS_LOGIN:false
        };

        this.userEmailOrButton = this.userEmailOrButton.bind(this);
        this.logOff = this.logOff.bind(this);
        this.login = this.login.bind(this);

    }




    componentDidMount() {

    }

    userEmailOrButton(){
        if(!this.props.logged_in)
        return (
            <Button  variant="outlined" color="primary"  onClick={this.login} style={{color:'white'}}>login</Button>
        )
        else{
            return (
                <div>
                    <Button  variant="outlined" color="primary"  onClick={this.logOff} style={{color:'white'}}>log off</Button>
                </div>


            )
        }
    }


    login = () => {
        this.setState({AWS_LOGIN:true})
    }


    logOff() {
        // console.log("log off")
        this.props.logOff()
    }



    render() {
        let email = ''
        if(this.props.userEmail){
            email = this.props.userEmail
        }

        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;

        if (!this.state.logged_in && this.state.AWS_LOGIN) {
            this.setState({ AWS_LOGIN: false })
            return <Redirect
                to={{
                    pathname: '/login',
                    // pathname:login_page.login_url,
                    state: { logged_in: false }
                }} />
        }
        else                                                //if user is not logged in
        {
            return (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            {/* <Avatar style={{ marginRight: 30 }} alt="User Logo" src={Logo} className={styles.bigAvatar} /> */}
                            <img
                                src={logo}
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    marginLeft: "-50px",
                                    maxWidth: "3vw",
                                    height: "auto"
                                }}
                            />
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Matayze
                            </Typography>

                            <div className={classes.grow} />
                            <Typography variant="h6" color="inherit" noWrap>
                                {email}
                            </Typography>
                            <div className={classes.sectionDesktop}>
                                {this.userEmailOrButton()}
                            </div>

                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);