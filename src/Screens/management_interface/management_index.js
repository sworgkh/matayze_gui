import React from 'react';
import AppBar from './AppBar'
import Card from './Card_with_lecture'
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup'


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
            showPopup: true
    }
        this.renderCard = this.renderCard.bind(this);
        this.createLecture = this.createLecture.bind(this);
    }


    componentDidMount() {
        //check if user is logged in


        //connect to dynamoDB and fetch data



        this.setState({lectures: static_data})

        //static data for now
        static_data.map(value => {  this.renderCard(value)})

    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }





    renderCard(oneLecture) {
        // this.setState({lectures :[... this.state.lectures, oneLecture ]})
        console.log(oneLecture.lecture)
    }

    createLecture(){

    }



    render() {
        if(this.state.logged_in) {
            return (
                <div>
                    <AppBar logged_in={this.state.logged_in}/>
                    {this.state.lectures.map(lecture => <Card key={lecture.lecture} allData={lecture}/>)}

                    <Popup trigger={<Button style={{margin:10}} size="small" color="primary"  onClick={this.bla}>
                        Create new lecture
                    </Button>} modal>
                        {close => (
                            <div className="modal">
                                <a className="close" onClick={close}>
                                    &times;
                                </a>
                                <div className="header"> Modal Title </div>
                                <div className="content">
                                    {' '}
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                                    Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                                    delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                                    commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                                    explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                                </div>
                                <div className="actions">
                                    <Popup
                                        trigger={<button className="button"> Trigger </button>}
                                        position="top center"
                                        closeOnDocumentClick
                                    >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
                                    </Popup>
                                    <button
                                        className="button"
                                        onClick={() => {
                                            console.log('modal closed ')
                                            close()
                                        }}
                                    >
                                        close modal
                                    </button>
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