import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";


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
            description: props.allData.description,
            lecturer: props.allData.lecturer,
            room: props.allData.room,
            EditPopup:false,
            DeletePopup:false
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);

        this.handleOpenEdit = this.handleOpenEdit.bind(this);
        this.handleOpenDelete = this.handleOpenDelete.bind(this);
        // this.delete = this.delete.bind(this);
        this.handleClose = this.handleClose.bind(this);


    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    edit() {
        this.handleClose()
        //need to implemet edit
        let newEventVals = {
            start_time: this.state.start_time,
            end_time:this.state.end_time ,
            lecture: this.state.lecture,
            description: this.state.description,
            lecturer:this.state.lecturer ,
            room:this.state.room ,
        }
        this.props.update(newEventVals,this.state.lecture);
        // alert("edit " + this.state.lecture)
    }

    delete() {
        this.handleClose()
        //need to implemet delete
        this.props.delete(this.state.lecture);
    }


    handleOpenEdit(){
        this.setState({EditPopup: true})
    }
    handleOpenDelete(){
        this.setState({DeletePopup: true})
    }



    handleClose(){
        this.setState({EditPopup: false,DeletePopup:false})

    }

    render() {
        return (
            <Card style={styles.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2"> {this.state.lecture}</Typography>
                        <Typography component="p">Lecturer: {this.state.lecturer} </Typography>
                        <Typography component="p">Start time: {this.state.start_time} </Typography>
                        <Typography component="p">End time: {this.state.end_time} </Typography>
                        <Typography component="p">Room: {this.state.room} </Typography>
                        <Typography component="p">Description: {this.state.description} </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{justifyContent: 'space-between'}}>

                    <Button size="small" color="primary" onClick={this.handleOpenEdit}>
                        Edit
                    </Button>

                    <Dialog
                        fullWidth={true}
                        fullHeight={true}
                        open={this.state.EditPopup}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle style={{justifyContent:'center',alignContent:'center'}} id="form-dialog-title">Create new Event</DialogTitle>
                        <DialogContent style={{justifyContent:'center',alignContent:'center'}}>
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
                                style={{width:'11%'}}
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
                                style={{width:'9%'}}
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
                                style={{width:'11%'}}
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
                                style={{width:'90%'}}
                                id="standard-multiline-flexible"
                                label="Description"
                                multiline
                                rowsMax="5"
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                margin="normal"
                            />
                            <br/>
                        </DialogContent>
                        <DialogActions style={{justifyContent:'center',alignContent:'center'}}>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.edit} color="primary">
                                Edit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Button size="small" color="primary" onClick={this.handleOpenDelete}>
                        Delete
                    </Button>

                    <Dialog
                        fullWidth={true}
                        fullHeight={true}
                        open={this.state.DeletePopup}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle style={{justifyContent:'center',alignContent:'center'}} id="form-dialog-title">Are you sure that you want to remove this event?</DialogTitle>
                        <DialogActions style={{justifyContent:'center',alignContent:'center'}}>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.delete} color="primary">
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardActions>
            </Card>
        );
    }
}


export default withStyles(styles)(Lecture);