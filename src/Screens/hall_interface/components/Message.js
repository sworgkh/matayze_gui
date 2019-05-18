import React from "react";

import Slider from "react-slick";

const styles = {
  container: {
    // display: "flex",
    width: "80vw",
    height: "80px",
    margin: "25px auto",
    color: "#fff",
    backgroundColor: "transparent"
  },
  heading: {
    color: "white",
    fontSize: "2.2em"
  },
  devider: {
    width: "80%",
    margin: "0 auto"
  },
  messageBody: {
    margin: "35px auto",
    paddingLeft: "10px"
  }
};

const messages = ["message 1", "message 2", "message 3", "message 4"];

export default class Message extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
      arrows: false
    };
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Update Messages</h1>
        <Slider {...settings}>
          <div>
            <p style={styles.messageBody}>{messages[0]}</p>
          </div>
          <div>
            <p style={styles.messageBody}>{messages[1]}</p>
          </div>
          <div>
            <p style={styles.messageBody}>{messages[2]}</p>
          </div>
          <div>
            <p style={styles.messageBody}>{messages[3]}</p>
          </div>
        </Slider>
        <hr />
      </div>
    );
  }
}
