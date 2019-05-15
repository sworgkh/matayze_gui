import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popup from 'reactjs-popup'
import Tooltip from "./management_index";
import CloseIcon from '@material-ui/icons/Close';
import TextField from "@material-ui/core/TextField";


const styles = {
    card: {
        maxWidth: 600,
        width: "31%",
        float: "left",
        margin: "1%"
    },
    media: {
        height: 400,
    },
};


class Lecture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start_time: props.allData.start_time,
            end_time: props.allData.end_time,
            lecture: props.allData.lecture,
            message: props.allData.message,
            lecturer: props.allData.lecturer,
            room: props.allData.room,
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);


    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    edit() {
        //need to implemet edit
        let newEventVals = {
            start_time: this.state.start_time,
            end_time:this.state.end_time ,
            lecture: this.state.lecture,
            message: this.state.message,
            lecturer:this.state.lecturer ,
            room:this.state.room ,
        }
        this.props.update(newEventVals,this.state.lecture);
        // alert("edit " + this.state.lecture)
    }

    delete() {
        //need to implemet delete
        this.props.delete(this.state.lecture);
        // alert("delete " + this.state.lecture)
    }

    render() {
        return (
            <Card style={styles.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2"> {this.state.lecture}</Typography>
                        <Typography component="p">{this.state.message} </Typography>
                        <Typography component="p">{this.state.start_time} </Typography>
                        <Typography component="p">{this.state.end_time} </Typography>
                        <Typography component="p">{this.state.lecturer} </Typography>
                        <Typography component="p">{this.state.room} </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions style={{justifyContent: 'space-between'}}>

                    <Popup trigger={<Button size="small" color="primary">
                        Edit
                    </Button>
                    } modal>
                        {close => (
                            <div className="modal">
                                <a className="close" onClick={close}>
                                    <CloseIcon/>
                                </a>
                                <div className="header"> Edit event</div>
                                <div className="content">
                                    <TextField
                                        id="standard-name"
                                        label="Title of the lecture"
                                        value={this.state.lecture}
                                        onChange={this.handleChange('lecture')}
                                        margin="normal"
                                    />
                                    <br/>
                                    <TextField
                                        id="standard-lecturer"
                                        label="Name for the lecturer"
                                        value={this.state.lecturer}
                                        onChange={this.handleChange('lecturer')}
                                        margin="normal"
                                    />
                                    <br/>
                                    <TextField
                                        id="standard-start_time"
                                        label="Start time"
                                        value={this.state.start_time}
                                        onChange={this.handleChange('start_time')}
                                        // type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                    />
                                    <br/>
                                    <TextField
                                        id="standard-number"
                                        label="Room"
                                        value={this.state.room}
                                        onChange={this.handleChange('room')}
                                        // type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                    />
                                    <br/>
                                    <TextField
                                        id="standard-number"
                                        label="End time"
                                        value={this.state.end_time}
                                        onChange={this.handleChange('end_time')}
                                        // type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                    />
                                    <br/>
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Multiline"
                                        multiline
                                        rowsMax="5"
                                        value={this.state.message}
                                        onChange={this.handleChange('message')}
                                        margin="normal"
                                    />
                                    <br/>
                                </div>
                                <div className="actions">
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            this.edit();
                                            close()
                                        }}
                                    >
                                        Submit Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            console.log('closed')
                                            close()
                                        }}
                                    >
                                        Cancel Edit
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Popup>

                    <Popup trigger={<Button size="small" color="primary">
                        Delete
                    </Button>
                    } modal>
                        {close => (
                            <div className="modal">
                                <a className="close" onClick={close}>
                                    <CloseIcon/>
                                </a>
                                <div className="header"> Are you sure that you want to remove this event?</div>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                        close()
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                        this.delete()
                                        console.log('closed')
                                        close()
                                    }}
                                >
                                    Delete Event
                                </Button>
                            </div>
                        )}
                    </Popup>
                </CardActions>
            </Card>
        );
    }
}


export default withStyles(styles)(Lecture);