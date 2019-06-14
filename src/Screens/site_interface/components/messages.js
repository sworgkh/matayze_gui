import React, { Component } from "react";
import Slider from "react-slick";
import env_vars from "../../../ENV_VAR";
//
var IntervalTime = 1000 * 60 * 1;
const styles = {
  container: {
    height: 80,
    margin: 'auto',
    width: '90%',
    color: "#fff",
    paddingBottom: 60
  },
  heading: {
    color: "white",
    fontSize: 24
  },
  messageBody: {
    margin: ".5vw auto",
    paddingLeft: "2vw",
    fontSize: 16
  },
  messageTitle: {
    fontSize: 20
  },
  message: {
    fontSize: 16
  }
};

var sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  arrows: false
};
//
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.fetchMessages = this.fetchMessages.bind(this);
  }
  async fetchMessages() {
    let url = env_vars.message_link + 'messages'
    let bearer = 'Bearer ' + this.props.token

    fetch(url, {
      method: 'POST',
      crossDomain: true,
      body: JSON.stringify({
        "type":"getAll",
        "message": "test",
        "title": "test"
      }),
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          this.setState({ messages: responseJson.data });
        }).catch(error => console.log(`error listing all objects: ${error}`));
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchMessages();
    }, IntervalTime);
    this.fetchMessages();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Update Messages</h2>
        <Slider {...sliderSettings}>
          {this.state.messages.map(messageObject => {
            return (
              <div style={styles.messageBody} key={messageObject.id}>
                <h3 style={styles.messageTitle}>{messageObject.title}</h3>
                <p style={styles.message}>{messageObject.message}</p>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}