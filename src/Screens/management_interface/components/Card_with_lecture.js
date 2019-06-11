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
import CardMedia from "@material-ui/core/CardMedia";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
const styles = {
    card: {
        maxWidth: 600,
        // width: this.props.width,
        // width: "31%",
        float: "left",
        margin: "1%",
        backgroundImage: 'linear-gradient(to bottom right, black, purple)',
        // backgroundColor:'#bbdefb',
    },
    media: {
        height: 400,
    },
};


class Lecture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lecturer_image: props.allData.lecturer_image,
            conference_title: props.allData.conference_title,
            start_time: props.allData.startDate.toString().slice(0,16),
            end_time: props.allData.endDate.toString().slice(0,16),
            lecture: props.allData.lecture,
            description: props.allData.description,
            lecturer: props.allData.lecturer,
            room: props.allData.room,
            EditPopup:false,
            DeletePopup:false,
            startDateTime:null
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

        console.log(this.state.startDateTime)
        let newEventVals = {
            conference_title: this.state.conference_title,
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


        const styles = {
            card: {
                maxWidth: '96%',
                // width: this.props.width,
                width: this.props.width,
                float: "left",
                margin: "1%",
                // height:500,
                // backgroundColor:'#bbdefb',
                backgroundImage: 'linear-gradient(to bottom right, white, darkblue)',
            },
            media: {
                height: 400,
            },
        };







        return (
            <Card style={styles.card}>
                <CardActionArea>
                    <CardMedia
                        style={{height:300}}
                        image={this.state.lecturer_image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2"> {this.state.conference_title}</Typography>
                        <Typography component="p">Lecture: {this.state.lecture}</Typography>
                        <Typography component="p">Lecturer: {this.state.lecturer} </Typography>
                        <Typography component="p">Start time: {this.state.start_time} </Typography>
                        <Typography component="p">End time: {this.state.end_time} </Typography>
                        <Typography component="p">Room: {this.state.room} </Typography>
                        <PerfectScrollbar>
                            <Typography style={{height:50}} component="p">Description: {this.state.description} </Typography>
                        </PerfectScrollbar>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{justifyContent: 'space-between'}}>

                    <Button variant="contained" color="primary" onClick={this.handleOpenEdit}>
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
                                label="Title of the conference"
                                value={this.state.conference_title}
                                onChange={this.handleChange('conference_title')}
                                margin="normal"
                            />
                            <br/>
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
                            {/*<TextField*/}
                            {/*    id="datetime-local"*/}
                            {/*    label="Next appointment"*/}
                            {/*    type="datetime-local"*/}
                            {/*    defaultValue="2017-05-24T10:30"*/}
                            {/*    onChange={this.handleChange('startDateTime')}*/}
                            {/*    value={this.state.startDateTime}*/}
                            {/*    InputLabelProps={{*/}
                            {/*        shrink: true,*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<br/>*/}


                            <TextField
                                id="standard-start_time"
                                label="Start time"
                                type="datetime-local"
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
                                type="datetime-local"
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
                    <Button variant="contained" color="primary" onClick={this.handleOpenDelete}>
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