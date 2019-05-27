import React from "react";

import Card from "./components/Card";
import Time from "./components/Time";
import Message from "./components/Message";

import logo from "./assets/logo.png";
import loader from "./assets/preloader.gif"
import { relative } from "path";

const styles = {
  pageContainer: {
    width: "100vw",
    height: "100vh",
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
    fontSize: "2.5em"
  }
};

export default class hall_index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lectures: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("prod/lectures")
      .then(lectures => {
        return lectures.json();
      })
        .then(response => {
          this.setState({
            lectures: response.data,
            isLoaded: true
          });
        });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div style={styles.pageContainer}>
              <img src={loader} style={styles.loader} />
        </div>
      )} else {
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
            <h1 style={styles.heading}>Confrance Name</h1>
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
          <div style={{padding: "2vh"}}>
            {this.state.lectures.map(lecture => {
              return <Card key={lecture.lectureID} data={lecture} />;
            })}
          </div>
          <Message />
        </div>
      );
    }
  }
}
