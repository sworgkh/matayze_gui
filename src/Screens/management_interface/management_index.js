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
import env_vars from '../../ENV_VAR'
import { Redirect } from "react-router-dom"

const styles = {
    containerStyle: {
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom right, black, purple)',
        width: '100%',
        minHeight: '800px',
        height: 'auto'
    }
}

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
            room: '',
            description: "",
            searchValue: '',
            openAdd: false,
            messages_screen: false,
            token: '',
            conference_title: '',
            back: false
        }
        this.createLecture = this.createLecture.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.logOff = this.logOff.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.changeLoginState = this.changeLoginState.bind(this);
        this.messagesScreen = this.messagesScreen.bind(this)
        this.addMessage = this.addMessage.bind(this);
        this.openCreateLecture = this.openCreateLecture.bind(this);
    }

    componentDidMount() {
        //check if user is logged in

        console.log(this.props.location.state.authToken.toString())

        this.loadProps()
        // this.setState({token: this.props.location.state.authToken.toString()})

        // console.log(this.state)


        this.setState({logged_in: this.props.location.state.logged_in, token: this.props.location.state.authToken})

        if (this.props.location.state) {
            this.setState({logged_in: this.props.location.state.logged_in, token: this.props.location.state.authToken})
        } else
            this.setState({logged_in: false})

        this.setState({lectures: []})


        //getAllLectures
        this.loadData()

        let url = env_vars.api_link
        let bearer = 'Bearer ' + this.props.location.state.authToken;
        // try {
        //     fetch(url, {
        //         method: 'GET',
        //         crossDomain: true,
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //         .then(response => response.json())
        //
        //         .then(responseJson => {
        //             console.log(responseJson.data);
        //             this.dealWithData(responseJson.data)
        //         })
        //         .catch(err => console.error('Caught error: ', err))
        //
        // }
        // catch (e) {
        //     console.log({Fetch_lectures_error: e})
        // }




        //lectures

        // let url = env_vars.api_link + "lectures";
        //
        // let bearer = 'Bearer ' + this.props.location.state.authToken;
        //
        // fetch(url, {
        //     method: 'GET',
        //     crossDomain: true,
        //     headers: {
        //         // 'Authorization': bearer,
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => response.json())
        //     .then(responseJson => {
        //         console.log(responseJson.data);
        //         this.dealWithData(responseJson.data)
        //     })



        //get all messages
        this.setState({messages: []})
        url = env_vars.message_link + 'messages'
        fetch(url, {
            method: 'POST',
            crossDomain: true,
            body: JSON.stringify({
                    "type":"getAll",
                    "title":"test",
                    "message":"test"
            }),
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                this.setState({messages : responseJson.data})
            })


        // {

        // }


        //connect to API and fetch data

        // this.setState({
        //     // lectures: static_data,
        //     messages: messages
        // })

        //static data for now

    }


    getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    loadData = () => {

        console.log('load data')
        let url = env_vars.api_link_get;

        let bearer = 'Bearer ' + this.props.location.state.authToken;

        fetch(url, {
            method: 'GET',
            crossDomain: true,
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.data);
                this.dealWithData(responseJson.data)
            })





        // try {
        //     fetch(url, {
        //         method: 'GET',
        //         crossDomain: true,
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //         .then(response => response.json())
        //
        //         .then(responseJson => {
        //             console.log(responseJson.data);
        //             this.dealWithData(responseJson.data)
        //         })
        //         .catch(err => console.error('Caught error: ', err))
        //
        // }
        // catch (e) {
        //     console.log({Fetch_lectures_error: e})
        // }

    }




    loadProps = () => {
        this.setState({token: this.props.location.state.authToken.toString()})
    }
    dealWithData = (data) => {
        this.setState({
            lectures: data,
        })
    }

    changeLoginState(newState) {
        this.setState({logged_in: newState})
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
        this.setState({logged_in: false, token: ''})
    }


    userProfile() {
        this.setState({
            profile: !this.state.profile
        });
    }

    messagesScreen() {

        this.setState({
            messages_screen: !this.state.messages_screen
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
        this.setState({[name]: event.target.value});
    };

    openCreateLecture() {
        this.setState({openAdd: true})
    }

    handleCloseCreateLecture = () => {
        this.setState({openAdd: false});
    };

    createLecture() {
        this.handleCloseCreateLecture()
        //need to implement add to database

        let newLecture = JSON.stringify({
            description: this.state.description,
            endDate: this.state.end_time,
            lecture: this.state.lecture,
            lecturer: this.state.lecturer,
            lecturer_image: this.state.lecturer_image,
            room: this.state.room.toString(),
            startDate: this.state.start_time,
            conference_title: this.state.conference_title,
        })
        console.log(newLecture)

        //post
        // let url = env_vars.api_link_post + "lectures";
        let url = env_vars.api_link_post
        let bearer = 'Bearer ' + this.props.location.state.authToken;
        fetch(url, {
            method: 'POST',
            // crossDomain: true,
            body: JSON.stringify({
                description: this.state.description,
                endDate: this.state.end_time,
                lecture: this.state.lecture,
                lecturer: this.state.lecturer,
                lecturer_image: this.state.lecturer_image,
                room: this.state.room.toString(),
                startDate: this.state.start_time,
                conference_title: this.state.conference_title,
            }),
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);

            })

        this.setState({lectures: []})
        setTimeout(() => {


                this.loadData()
                // fetch(url, {
                //     method: 'GET',
                //     crossDomain: true,
                //     headers: {
                //         'Authorization': bearer,
                //         'Content-Type': 'application/json'
                //     }
                // }).then(response => response.json())
                //     .then(responseJson => {
                //         console.log(responseJson.data);
                //         this.dealWithData(responseJson.data)
                //     })
            }
            , 1000);
    }

    handleSearch(val) {
        console.log('search')
        // this.loadData()
        let oldState = this.state.lectures
        let newState = []

        if (val === '') {
            this.componentDidMount()
            return
        }

        oldState.map(lecture => {
            console.log(lecture)
            let contains = false
            if (lecture.conference_title.includes(val)) {
                contains = true
            }
            if (lecture.lecture.includes(val)) {
                contains = true
            }
            if (lecture.lecturer.includes(val)) {
                contains = true
            }
            if (lecture.startDate.toString().includes(val)) {
                contains = true
            }
            if (lecture.endDate.toString().includes(val)) {
                contains = true
            }
            if (lecture.description.includes(val)) {
                contains = true
            }
            if (lecture.room.toString().includes(val)) {
                contains = true
            }
            if (contains)
                newState.push(lecture)
        })
        this.setState({lectures: newState})

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
        this.setState({messages: newState})

    }

    addMessage(message) {
        // console.log(message)
        //need to implement add to database
        // console.log(this.props.location.state.authToken)

        let url = env_vars.message_link + "messages";
        let bearer = 'Bearer ' + this.props.location.state.authToken;
        fetch(url, {
            method: 'POST',
            crossDomain: true,
            body: JSON.stringify({                                                  ///
                message: message.message,
                title: message.title,
                type: 'publish'
            }),
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);

            })
        this.setState({messages: [...this.state.messages, message]})
    }

    back =() =>{
        this.setState({back:true})
    }

    deleteMessage(id) {
        console.log(id)
        let url = env_vars.message_link + 'messages'
        let bearer = 'Bearer ' + this.props.location.state.authToken;
        fetch(url, {
            method: 'POST',
            crossDomain: true,
            body: JSON.stringify({
                "type":"delete",
                "id":id,
                "message": "delete",
                "title": "delete"
            }),
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
            })


        //need to implement delete from database

        const newState = this.state;
        const index = newState.messages.findIndex(a => a.id === id);

        if (index === -1) return;
        newState.messages.splice(index, 1);

        this.setState(newState);
    }


    render() {
        if(this.state.back){
            return  <Redirect  to={{
                pathname: '/',
                state: { logged_in: false ,authToken: null, access_token:  null}
            }}/>
        }


        let width = this.getWindowDimensions().width
        let cardWidth = '31%'
        let messageWidth = '100%'
        if(width < 1053){
            cardWidth = '100%'
            messageWidth = '96%'
        }

        if (this.state.logged_in && this.state.profile) {

            return (
                <div style={styles.containerStyle}>
                    <AppBar
                        back={this.back.bind(this)}
                        userProfile={this.userProfile.bind(this)}
                        addMessage={this.addMessage.bind(this)}
                        search={this.handleSearch.bind(this)}
                        logOff={this.logOff.bind(this)}
                        logged_in={this.state.logged_in}/>
                    <Profile userProfile={this.userProfile.bind(this)}/>
                </div>
            );
        }
        if (this.state.logged_in) {
            return (
                <div style={styles.containerStyle}>
                    <AppBar
                        username={this.props.location.state.userData.username}
                        back={this.back.bind(this)}
                        userProfile={this.userProfile.bind(this)}
                        addMessage={this.addMessage.bind(this)}
                        search={this.handleSearch.bind(this)}
                        logOff={this.logOff.bind(this)}
                        messagesScreen={this.messagesScreen.bind(this)}
                        logged_in={this.state.logged_in}
                    />
                    <Paper style={{margin: 10, borderRadius: 3, backgroundColor: '#3f51b5'}} elevation={1}>
                        <Typography style={{margin: 5, color: 'white'}} variant="h5" component="h3">
                            Broadcast Messages
                        </Typography>
                    </Paper>

                    <div style={{width: '96%', marginTop: 10, margin: '2%'}}>
                        {this.state.messages.map(message => <Message width={messageWidth} delete={this.deleteMessage.bind(this)}
                                                                     key={message.id} message={message}/>)}
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <div>
                        <Paper style={{margin: 10, borderRadius: 3, backgroundColor: '#3f51b5'}} elevation={1}>
                            <Typography style={{margin: 5, color: 'white'}} variant="h5" component="h3">
                                Meetings
                            </Typography>
                        </Paper>
                    </div>

                    <div style={{width: '96%', marginTop: 10, margin: '2%'}}>
                        {this.state.lectures.map(lecture => <Card width={cardWidth} delete={this.deleteEvent.bind(this)}
                                                                  update={this.updateEvent.bind(this)}
                                                                  key={lecture.lectureID} allData={lecture}/>)}
                    </div>

                    <Tooltip title="Add" aria-label="Add" onClick={this.openCreateLecture}>
                        <Fab color="secondary" style={{margin: 10}}>
                            <AddIcon/>
                        </Fab>
                    </Tooltip>

                    <Dialog
                        fullWidth={true}
                        fullHeight={true}
                        open={this.state.openAdd}
                        onClose={this.handleCloseCreateLecture}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle style={{justifyContent: 'center', alignContent: 'center'}} id="form-dialog-title">Create
                            new Event</DialogTitle>
                        <DialogContent style={{justifyContent: 'center', alignContent: 'center'}}>
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
                            <TextField
                                id="datetime-local"
                                label="Start time"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                onChange={this.handleChange('start_time')}
                                value={this.state.startDateTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <br/>

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
                            <br/>
                            <TextField
                                id="datetime-local"
                                label="End time"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                onChange={this.handleChange('end_time')}
                                value={this.state.startDateTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <br/>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Image URL"
                                multiline
                                style={{width: '90%'}}
                                rowsMax="5"

                                value={this.state.lecturer_image}
                                onChange={this.handleChange('lecturer_image')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Description"
                                multiline
                                style={{width: '90%'}}
                                rowsMax="5"

                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                // className={classes.textField}
                                margin="normal"
                            />
                            <br/>
                        </DialogContent>
                        <DialogActions style={{justifyContent: 'center', alignContent: 'center'}}>
                            <Button onClick={this.handleCloseCreateLecture} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.createLecture} color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div style={{clear: 'both'}}></div>
                </div>
            );
        } else {
            return (
                <div style={styles.containerStyle}>
                    <AppBar
                        back={this.back.bind(this)}
                        logged_in={this.state.logged_in}/>
                    <h3 style={{margin: 20, color: 'white'}}>Welcome to your management console, Please login to make
                        changes</h3>
                    <Button variant="outlined" color="primary" onClick={() => {
                        this.back()
                        // window.location.href = '/'
                    }} style={{color: 'white', margin: 20}}>Back to main page</Button>
                </div>
            );

        }

    }
}

//
export default windowSize(managementIndex);