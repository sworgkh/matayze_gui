import React, { Component } from "react";
import Slider from "react-slick";
//
var IntervalTime = 1000 * 60 * 5;
const styles = {
  container: {
    position: "fixed",
    bottom: "5vh",
    width: "60vw",
    height: "12vh",
    marginLeft: "15vw",
    marginTop: ".5vh",
    color: "#fff"
  },
  heading: {
    color: "white",
    fontSize: "2.2em"
  },
  messageBody: {
    margin: ".5vw auto",
    paddingLeft: "2vw",
    fontSize: "1.5em"
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
    let url =
      "https://cs1h8nv6uf.execute-api.eu-west-1.amazonaws.com/dev/get-s3";
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(body => {
        this.setState({ messages: body.messages });
        console.log("fetching");
      })
      .catch(error => console.log(`error listing all objects: ${error}`));
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
                <h3>{messageObject.title}</h3>
                <h4>{messageObject.message}</h4>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
