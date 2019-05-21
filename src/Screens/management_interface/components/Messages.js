// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Fab from '@material-ui/core/Fab';
// import DeleteIcon from '@material-ui/icons/Delete';


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import Message from "./Card_with_message";
import Paper from "@material-ui/core/Paper";



const messages = [
    {
        title: 'Hello',
        message: 'Hello all people'
    },
    {
        title: 'Hello1',
        message: 'Hello all people 1'
    }
]



const styles = theme => ({

    containerStyle: {
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom right, black, purple)',
        height: "1000px",
    },

    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class Messages extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages:[],
        };
    }
    componentDidMount() {

        this.setState({messages:messages})

        // console.log(this.props.messages)
    }

    addMessage(message) {
        //need to implement add to database

        this.setState({ messages: [... this.state.messages, message] })
    }

    deleteMessage(id) {
        //need to implement delete from database

        const newState = this.state;
        const index = newState.messages.findIndex(a => a.title === id);

        if (index === -1) return;
        newState.messages.splice(index, 1);

        this.setState(newState);
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper style={{margin:10,borderRadius: 3,backgroundColor:'#3f51b5' }} elevation={1}>
                    <Typography style={{margin:5,color:'white'}} variant="h5" component="h3">
                        Broadcast Messages
                    </Typography>
                </Paper>
                <div style={{ width: '96%', marginTop: 10, margin: '2%' }} >
                    {this.state.messages.map(message => <Message delete={this.deleteMessage.bind(this)} key={message.title} message={message} />)}
                </div>
                <div style={{ clear: 'both' }}></div>
                <Button onClick={this.props.messagesScreen} style={{margin:20}} variant="contained" color="primary" className={classes.button}>
                    Return to meetings screen
                </Button>
            </div>
        );
    }
}


export default withStyles(styles)(Messages);