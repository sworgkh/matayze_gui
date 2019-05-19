import React from 'react';
import AppBar from './components/AppBar'
import Card from './components/Card_with_lecture'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Message from './components/Card_with_message'
import Profile from './components/Profile'
import windowSize from 'react-window-size';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";


const styles = {
    containerStyle: {
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom right, black, purple)',
        width: '100%',
        minHeight: '800px',
        height: 'auto'
    }
}




const static_data =
    [
        {
            lecture: "Demo one",
            lecturer: "Valin",
            start_time: "00:00",   //Time
            end_time: "01:00",
            room: "265",
            description: "Welcome all people go do stuff"
        },
        {
            lecture: "Demo two",
            lecturer: "Mona",
            start_time: "01:00",   //Time
            end_time: "04:00",
            room: "165",
            description: "Welcome all people go do stuff"
        },
        {
            lecture: "Demo three",
            lecturer: "Moba",
            start_time: "01:00",   //Time
            end_time: "02:00",
            room: "2645",
            description: "Welcome all people go do stuff"
        }
    ]



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


class managementIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lectures: [],
            messages: [],
            logged_in: false,                                                //toggle to change views
            showPopup: true,
            profile: false,                                                   //toggle to see profile
            lecture: "",
            lecturer: "",
            start_time: "",                                                     //Time
            end_time: "",                                                       //Time
            room: 0,
            description: "",
            searchValue: '',
            openAdd: false
        }
        this.createLecture = this.createLecture.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.logOff = this.logOff.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.changeLoginState = this.changeLoginState.bind(this);
        // this.handleSearch = this.handleSearch.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.openCreateLecture = this.openCreateLecture.bind(this);
    }


    componentDidMount() {
        //check if user is logged in

        if (this.props.location.state)
            this.setState({ logged_in: this.props.location.state.logged_in })
        else
            this.setState({ logged_in: false })



        //connect to API and fetch data

        this.setState({
            lectures: static_data,
            messages: messages
        })

        //static data for now

    }



    changeLoginState(newState) {
        this.setState({ logged_in: newState })
    }

    deleteEvent(id) {
        //database delete
        const newState = this.state;
        const index = newState.lectures.findIndex(a => a.lecture === id);

        if (index === -1) return;
        newState.lectures.splice(index, 1);

        this.setState(newState);
    }

    logOff() {
        //manage database logged_in

        this.setState({ logged_in: false })
    }


    userProfile() {

        this.setState({
            profile: !this.state.profile
        });
    }

    updateEvent(newValues, id) {
        //database edit


        const newState = this.state;
        const index = newState.lectures.findIndex(a => a.lecture === id);

        if (index === -1) return;
        else {
            newState.lectures[index].lecture = newValues.lecture;
            newState.lectures[index].lecturer = newValues.lecturer;
            newState.lectures[index].start_time = newValues.start_time;
            newState.lectures[index].end_time = newValues.end_time;
            newState.lectures[index].room = newValues.room;
            newState.lectures[index].description = newValues.description
        }
        this.setState(newState);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    openCreateLecture() {
        this.setState({ openAdd: true })
    }

    handleCloseCreateLecture = () => {
        this.setState({ openAdd: false });
    };

    createLecture() {
        this.handleCloseCreateLecture()
        //need to implement add to database

        let newLecure = {
            lecture: this.state.lecture,
            lecturer: this.state.lecturer,
            start_time: this.state.start_time,   //Time
            end_time: this.state.end_time,
            room: this.state.room.toString(),
            description: this.state.description
        }
        this.setState({ lectures: [... this.state.lectures, newLecure] })
    }

    handleSearch(val) {
        let oldState = this.state.lectures
        let newState = []

        if (val === '') {
            this.componentDidMount()
            return
        }

        oldState.map(lecture => {
            let contains = false
            if (lecture.lecture.includes(val)) {
                contains = true
            }
            if (lecture.lecturer.includes(val)) {
                contains = true
            }
            if (lecture.start_time.includes(val)) {
                contains = true
            }
            if (lecture.end_time.includes(val)) {
                contains = true
            }
            if (lecture.description.includes(val)) {
                contains = true
            }
            if (lecture.room.includes(val)) {
                contains = true
            }
            if (contains)
                newState.push(lecture)
        })
        this.setState({ lectures: newState })

        oldState = this.state.messages
        newState = []

        oldState.map(message => {
            let contains = false
            if (message.title.includes(val)) {
                contains = true
            }
            if (message.message.includes(val)) {
                contains = true
            }
            if (contains)
                newState.push(message)
        })
        this.setState({ messages: newState })

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
        if (this.state.logged_in && this.state.profile) {

            return (
                <div style={styles.containerStyle}>
                    <AppBar
                        userProfile={this.userProfile.bind(this)}
                        addMessage={this.addMessage.bind(this)}
                        search={this.handleSearch.bind(this)}
                        logOff={this.logOff.bind(this)}
                        logged_in={this.state.logged_in} />
                    <Profile userProfile={this.userProfile.bind(this)} />
                </div>
            );
        }
        if (this.state.logged_in) {
            return (
                <div style={styles.containerStyle}>
                    <AppBar
                        userProfile={this.userProfile.bind(this)}
                        addMessage={this.addMessage.bind(this)}
                        search={this.handleSearch.bind(this)}
                        logOff={this.logOff.bind(this)}
                        logged_in={this.state.logged_in}
                    />
                    <Paper style={{ marginTop: 10, borderRadius: 0 }} elevation={1}>
                        <Typography style={{ margin: 10 }} variant="h5" component="h3">
                            Broadcast Messages
                        </Typography>
                    </Paper>

                    <div style={{ width: '96%', marginTop: 10, margin: '2%' }} >
                        {this.state.messages.map(message => <Message delete={this.deleteMessage.bind(this)} key={message.title} message={message} />)}
                    </div>
                    <div style={{ clear: 'both' }}></div>
                    <div>
                        <Paper style={{ marginTop: 10, borderRadius: 0 }} elevation={1}>
                            <Typography style={{ margin: 10 }} variant="h5" component="h3">
                                Meetings
                            </Typography>
                        </Paper>
                    </div>

                    <div style={{ width: '96%', marginTop: 10, margin: '2%' }} >
                        {this.state.lectures.map(lecture => <Card delete={this.deleteEvent.bind(this)} update={this.updateEvent.bind(this)} key={lecture.lecture} allData={lecture} />)}
                    </div>

                    <Tooltip title="Add" aria-label="Add" onClick={this.openCreateLecture}>
                        <Fab color="secondary" style={{ margin: 10 }}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>

                    <Dialog
                        fullWidth={true}
                        fullHeight={true}
                        open={this.state.openAdd}
                        onClose={this.handleCloseCreateLecture}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle style={{ justifyContent: 'center', alignContent: 'center' }} id="form-dialog-title">Create new Event</DialogTitle>
                        <DialogContent style={{ justifyContent: 'center', alignContent: 'center' }}>
                            <TextField
                                id="standard-name"
                                label="Title of the lecture"
                                value={this.state.lecture}
                                onChange={this.handleChange('lecture')}
                                margin="normal"
                            />
                            <br />
                            <TextField
                                id="standard-lecturer"
                                label="Name for the lecturer"
                                value={this.state.lecturer}
                                onChange={this.handleChange('lecturer')}
                                margin="normal"
                            />
                            <br />
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
                            <br />
                            <TextField
                                id="standard-number"
                                label="Room"
                                value={this.state.room}
                                onChange={this.handleChange('room')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <br />
                            <TextField
                                id="standard-number"
                                label="End time"
                                value={this.state.end_time}
                                onChange={this.handleChange('end_time')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <br />
                            <TextField
                                id="standard-multiline-flexible"
                                label="Description"
                                multiline
                                style={{ width: '90%' }}
                                rowsMax="5"

                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                // className={classes.textField}
                                margin="normal"
                            />
                            <br />
                        </DialogContent>
                        <DialogActions style={{ justifyContent: 'center', alignContent: 'center' }}>
                            <Button onClick={this.handleCloseCreateLecture} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.createLecture} color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div style={{ clear: 'both' }}></div>
                </div>
            );
        }
        else {


            return (
                <div style={styles.containerStyle}>
                    <AppBar logged_in={this.state.logged_in} />
                    <h3 style={{ margin: 20, color: 'white' }}>Welcome to your management console, Please login to make changes</h3>

                </div>
            );

        }

    }


}
//
export default windowSize(managementIndex);