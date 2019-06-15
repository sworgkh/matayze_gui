import React from "react";
import moment from "moment"
import Card from "./components/Card";
import Time from "./components/Time";
import Message from "./components/Message";

import logo from "./assets/logo.png";
import loader from "./assets/preloader.gif";
import env_vars from '../../ENV_VAR'
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";


const styles = {
  pageContainer: {
    width: "100vw",
    minHeight: "100vh",
    background: "linear-gradient(to top left, purple 30%, #2a2a2a 70%)"
  },
  loader: {
    displat: "block",
    width: "10vw",
    height: "auto",
    position: "absolute",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-50px",
    top: "50%"
  },
  heading: {
    color: "white",
    fontSize: "3vw"
  },
  message: {
    color: "white",
    fontSize: "4vw",
    paddingTop: "20vh"
    // alignText: "center",
    // width: "30vw"
  }
};

export default class hall_index extends React.Component {
  constructor(props) {
    super(props);

    this.lectures = [];

    this.state = {
        AWS_LOGIN:false,
        logged_in: false,
        shownLectures: [],
        isLoaded: false
    };
    this.login = this.login.bind(this)
  }

  async componentDidMount() {
      // console.log(this.props.location.state.authToken)
      if(this.props.location.state)
        this.setState({logged_in: true})

      let url = env_vars.api_link_get;
      let bearer = "Bearer " + this.props.location.state.authToken;
      await fetch(url, {
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
              this.lectures = responseJson.data;
              // this.dealWithData(responseJson.data)
          })

   this.setState({ isLoaded: true });

    console.log(this.lectures)
    // await fetch("prod/lectures")
    //   .then(lectures => {
    //     return lectures.json();
    //   })
    //   .then(response => {
    //     this.lectures = response.data;
    //     this.setState({ isLoaded: true });
    //     console.log();
    //   });
    this.checkLecturetime();
    setInterval(() => {
      let minutes = new Date().getMinutes();
      if (minutes % 5 === 0) {
        this.checkLecturetime();
      }
    }, 60000);
  }

  login(){
      this.setState({ AWS_LOGIN: true })
  }

  checkLecturetime = () => {
    let tempLectures = [];

    this.lectures.map(lecture => {
      let startDate = new Date(lecture.startDate);
      let start = startDate.getTime()
      let now = new Date()
      let current = now.getTime()
      let durationTime = moment.duration({hour: 1}) + current
      let startingNow = current - moment.duration({minute: 1})
      if (start <= durationTime && start >= startingNow)
        tempLectures.push(lecture);
      // if (startDate > now && startDate.getDate() === now)
      //   tempLectures.push(lecture);
    });

    tempLectures.sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    });
    this.setState({ shownLectures: tempLectures });
  };

  cardRendering = () => {
    let tmp = [];
    if (this.state.shownLectures.length === 0)
      return <h1 style={styles.message}>No lectures For The Next Hour</h1>;

    if (this.state.shownLectures.length) {
      for (let i = 0; i < 3; i++) {
        if (this.state.shownLectures[i]) {
          tmp.push(
            <Card
              data={this.state.shownLectures[i]}
              key={this.state.shownLectures[i].lectureID}
            />
          );
        }
      }
      return tmp;
    }
  };

  render() {
      if (!this.state.logged_in && this.state.AWS_LOGIN) {
          console.log('Here')
          this.setState({ AWS_LOGIN: false })
          return <Redirect
              to={{
                  pathname: '/login',
                  state: { logged_in: false }
              }} />
      }

      if(!this.state.logged_in){
          return (
              <div style={styles.pageContainer}>
                  <Button variant="outlined" color="primary" onClick={this.login} style={{color:'white',margin:20}}>login</Button>
              </div>
          )
      }

    // this.checkLecturetime();
    if (!this.state.isLoaded) {
      return (
        <div style={styles.pageContainer}>
          <img src={loader} style={styles.loader} />
        </div>
      );
    } else {
      return (
        <div style={styles.pageContainer}>
          <div
            style={{
              display: "flex",
              position: "relative",
              justifyContent: "space-between",
              width: "80vw",
              margin: "0 auto",
              alignItems: "center",
              height: "15vh"
            }}
          >
            <h1 style={styles.heading}>{this.lectures[2].conference_title}</h1>
            <img
              src={logo}
              style={{
                position: "absolute",
                left: "50%",
                marginLeft: "-50px",
                maxWidth: "5vw",
                height: "auto"
              }}
            />
            <Time />
          </div>

          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2vh",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.cardRendering()}
          </div>
          <Message  token={this.props.location.state.authToken} />
        </div>
      );
    }
  }
}
