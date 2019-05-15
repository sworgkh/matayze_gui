import React from 'react';
import AppBar from './AppBar'
import Card from './Card_with_lecture'
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup'
import FormLabel from '@material-ui/core/FormLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// const currencies = [
//     {
//         value: 'USD',
//         label: '$',
//     },
//     {
//         value: 'EUR',
//         label: '€',
//     },
//     {
//         value: 'BTC',
//         label: '฿',
//     },
//     {
//         value: 'JPY',
//         label: '¥',
//     },
// ];



const static_data =
    [
        {
            lecture: "Demo one",
            lecturer: "Valin",
            start_time: "00:00",   //Time
            end_time: "01:00",
            room: "265",
            message: "Welcome all people go do stuff"
        },
        {
            lecture: "Demo two",
            lecturer: "Mona",
            start_time: "01:00",   //Time
            end_time: "04:00",
            room: "165",
            message: "Welcome all people go do stuff"
        },
        {
            lecture: "Demo three",
            lecturer: "Moba",
            start_time: "01:00",   //Time
            end_time: "02:00",
            room: "2645",
            message: "Welcome all people go do stuff"
        }
        ]





export default class managementIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lectures: [],
            logged_in: true,                                                    //toggle to change views
            showPopup: true,
            lecture: "",
            lecturer: "",
            start_time: "",                                                     //Time
            end_time: "",                                                       //Time
            room: 0,
            message: ""
    }
        this.renderCard = this.renderCard.bind(this);
        this.createLecture = this.createLecture.bind(this);

    }

    deleteEvent(id) {
        //implement delete
    }

    updateEvent(newValues,id){
        //implement update

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    componentDidMount() {
        //check if user is logged in


        //connect to dynamoDB and fetch data

        this.setState({lectures: static_data})

        //static data for now
        static_data.map(value => {  this.renderCard(value)})

    }



    renderCard(oneLecture) {
        // this.setState({lectures :[... this.state.lectures, oneLecture ]})
        console.log(oneLecture.lecture)
    }

    createLecture(){
        let newLecure = {
            lecture: this.state.lecture,
            lecturer:this.state.lecturer,
            start_time: this.state.start_time,   //Time
            end_time:this.state.end_time,
            room: this.state.room.toString(),
            message: this.state.message
        }
        this.setState({lectures :[... this.state.lectures, newLecure] })
    }



    render() {
        if(this.state.logged_in) {
            return (
                <div>
                    <AppBar logged_in={this.state.logged_in}/>
                    {this.state.lectures.map(lecture => <Card key={lecture.lecture} allData={lecture}/>)}

                    <Popup trigger={<Tooltip title="Add" aria-label="Add">
                        <Fab color="secondary" style={{margin: 10}}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>} modal>
                        {close => (
                            <div className="modal">
                                <a className="close" onClick={close}>
                                    <CloseIcon/>
                                </a>
                                <div className="header"> New event creation </div>
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
                                        // className={classes.textField}
                                        margin="normal"
                                    />
                                    <br/>
                                    {/*<TextField*/}
                                        {/*id="standard-select-currency"*/}
                                        {/*select*/}
                                        {/*label="Select"*/}
                                        {/*value={this.state.currency}*/}
                                        {/*onChange={this.handleChange('currency')}*/}
                                        {/*helperText="Please select your currency"*/}
                                        {/*margin="normal"*/}
                                    {/*>*/}
                                        {/*{currencies.map(option => (*/}
                                            {/*<MenuItem key={option.value} value={option.value}>*/}
                                                {/*{option.label}*/}
                                            {/*</MenuItem>*/}
                                        {/*))}*/}
                                    {/*</TextField>*/}


                                </div>
                                <div className="actions">
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            this.createLecture();
                                            close()
                                        }}
                                    >
                                        Submit
                                    </Button>

                                    <Button
                                        size="small"
                                        // className="button"
                                        color="primary"
                                        onClick={() => {
                                            console.log('closed ')
                                            close()
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            );
        }
        else {
            return (
                <div>
                    <AppBar logged_in={this.state.logged_in}/>
                    <h3 style={{margin:20}}>Welcome to you management console, Please login to make changes</h3>

                </div>
            );

        }

    }


}