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
import BackIcon from '@material-ui/icons/ArrowBack';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Logo from '../assets/logo.png'
import Avatar from "@material-ui/core/Avatar";
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

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
    backgroundBar: {
        background: 'linear-gradient(to right, #4f0053, transparent)'      
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class PrimarySearchAppBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            anchorElMessage: null,
            mobileMoreAnchorEl: null,
            search: '',
            AWS_LOGIN: false,
            message: '',
            title: '',
            BroadCastPopup: false
        };
        this.keyPress = this.keyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAWSLogin = this.handleAWSLogin.bind(this);
        this.logOff = this.logOff.bind(this);
        this.userProfile = this.userProfile.bind(this);
        this.handleBroadCastPopup = this.handleBroadCastPopup.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.broadCastMessage = this.broadCastMessage.bind(this)
        this.messagesScreen = this.messagesScreen.bind(this)
    }

    handleBroadCastPopup() {
        this.handleMenuClose()
        this.setState({ BroadCastPopup: true })
    }
    handleClose() {
        this.setState({ BroadCastPopup: false })

    }


    handleChange(e) {
        this.setState({ search: e.target.value });
        this.props.search(this.state.search)
    }


    handleChangeVal = name => event => {
        this.setState({ [name]: event.target.value });
    };

    keyPress(e) {
        if (e.keyCode === 13) {
            this.props.search(this.state.search)
        }
        if (e.keyCode === 8 && (this.state.search.length === 1)) {
            this.props.search('')
        }
    }

    componentDidMount() {
    }

    handleProfileMenuOpenLoggedOf = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };


    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };


    handleAWSLogin(e) {
        this.handleMenuClose()
        this.setState({ AWS_LOGIN: true })

    }

    logOff() {
        this.handleMenuClose()
        // console.log("log off")
        this.props.logOff()
    }


    broadCastMessage() {
        //send to API
        this.handleClose()
        let message = {
            title: this.state.title,
            message: this.state.message
        }
        this.setState({ message: '', title: '' })
        this.props.addMessage(message)
    }

    userProfile() {
        this.handleMenuClose()
        this.props.userProfile()

    }

    messagesScreen() {
        this.props.messagesScreen()

    }

    back = () =>{
        this.props.back()
    }


    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >

                {/* <MenuItem onClick={this.userProfile}>Profile</MenuItem> */}
                <MenuItem onClick={this.logOff}>Sign Out</MenuItem>
            </Menu>
        );


        const renderMenuLoggedOff = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleAWSLogin}>Login with AWS</MenuItem>
            </Menu>
        );


        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem  onClick={this.handleBroadCastPopup}>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <MessageIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                {/* <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem> */}
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Sign Out</p>
                </MenuItem>
            </Menu>
        );


        const renderMobileMenuLoggedOff = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleAWSLogin}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Login with AWS</p>
                </MenuItem>
            </Menu>
        );

        if (this.props.logged_in) {
            return (
                <div className={classes.root}>
                    <AppBar className={classes.backgroundBar} position="static">
                        <Toolbar>
                           {/*<IconButton onClick={() => this.back()} className={classes.menuButton} color="inherit" aria-label="Open drawer">*/}
                           {/*     <BackIcon />*/}
                           {/* </IconButton>*/}
                            <Avatar style={{ marginRight: 10 }} alt="User Logo" src={Logo} className={styles.bigAvatar}/>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Management Panel
                            </Typography>
                            <div className={classes.search}>
                                <div className={classes.searchIcon} onClick={()=> alert('search')} >
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    // onClick={this.props.search()}
                                    onChange={this.handleChange}
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    onKeyDown={this.keyPress}
                                />
                            </div>
                            <div className={classes.grow} />
                            <Typography style={{color:'white'}}>Welcome {this.props.username}</Typography>
                            <div className={classes.sectionDesktop}>
                                <IconButton color="inherit" onClick={this.handleBroadCastPopup}
                                    aria-haspopup="true"
                                >
                                    <MessageIcon />
                                </IconButton>
                                <Dialog
                                    fullWidth={true}
                                    fullHeight={true}
                                    open={this.state.BroadCastPopup}
                                    onClose={this.handleClose}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <DialogTitle style={{ justifyContent: 'center', alignContent: 'center' }} id="form-dialog-title">Enter message to broadcast</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Title"
                                            value={this.state.title}
                                            onChange={this.handleChangeVal('title')}
                                            margin="normal"
                                        />
                                        <br />
                                        <TextField
                                            style={{ width: '90%' }}
                                            id="standard-multiline-flexible"
                                            label="Message"
                                            multiline
                                            rowsMax="5"
                                            value={this.state.message}
                                            onChange={this.handleChangeVal('message')}
                                            margin="normal"
                                        />
                                    </DialogContent>
                                    <DialogActions style={{ justifyContent: 'center', alignContent: 'center' }}>


                                        <Button onClick={this.handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={this.broadCastMessage} color="primary">
                                            Broadcast
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                {/*<IconButton onClick={this.messagesScreen} color="inherit">*/}
                                {/*    <MailIcon />*/}
                                {/*</IconButton>*/}
                                {/* <IconButton color="inherit">
                                    <Badge badgeContent={1} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton> */}
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                    {renderMobileMenu}
                </div>
            );
        }
        if (!this.state.logged_in && this.state.AWS_LOGIN) {
            this.setState({ AWS_LOGIN: false })
            // return <Redirect
            //     to={{
            //         pathname: '/login',
            //         state: { logged_in: false }
            //     }} />
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
                    <AppBar className={classes.backgroundBar} position="static">
                        <Toolbar>
                            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                                <MenuIcon />
                            </IconButton> */}
                            <Avatar style={{ marginRight: 10 }} alt="User Logo" src={Logo} className={styles.bigAvatar} />
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Admin Panel
                            </Typography>

                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpenLoggedOf}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton aria-haspopup="true" onClick={this.handleProfileMenuOpenLoggedOf} color="inherit">
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {renderMenuLoggedOff}
                    {renderMobileMenuLoggedOff}
                </div>
            );
        }
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);