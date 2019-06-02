import React from "react";

import Slider from "react-slick";

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

const messages = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus purus ut mauris       vehicula auctor. Mauris tincidunt sem quis ex tincidunt, sit amet condimentum diam tincidunt.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus purus ut mauris vehicula auctor. Mauris tincidunt sem quis ex tincidunt, sit amet condimentum diam tincidunt.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus purus ut mauris vehicula auctor. Mauris tincidunt sem quis ex tincidunt, sit amet condimentum diam tincidunt.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus purus ut mauris vehicula auctor. Mauris tincidunt sem quis ex tincidunt, sit amet condimentum diam tincidunt."
];

export default class Message extends React.Component {
  render() {
    var settings = {
      dots: false,
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
      </div>
    );
  }
}
