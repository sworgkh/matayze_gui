import React from "react";

import Card from "./components/Card";
import Time from "./components/Time";
import Message from "./components/Message";

import logo from "./assets/logo.png";
import { relative } from "path";

const styles = {
  pageContainer: {
    width: "100vw",
    height: "100vh",
    backgroundImage: "linear-gradient(to top left, purple, black)"
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
      lectures: []
    };
  }

  componentDidMount() {
    fetch("prod/lectures")
      .then(lectures => {
        return lectures.json();
      })
      .then(response => {
        this.setState({ lectures: response.data });
      });
  }

  render() {
    return (
      <div style={styles.pageContainer}>
        <div
          style={{
            display: "flex",
            position: relative,
            justifyContent: "space-between",
            width: "80%",
            margin: "0 auto",
            alignItems: "center",
            height: "110px"
          }}
        >
          <h1 style={styles.heading}>Confrance Name</h1>
          <img
            src={logo}
            style={{
              position: "absolute",
              left: "50%",
              marginLeft: "-50px",
              width: "70px",
              height: "90px"
            }}
          />
          <Time />
        </div>

        <hr />
        <div style={{ padding: "30px" }}>
          {this.state.lectures.map(lecture => {
            return <Card key={lecture.lectureID} data={lecture} />;
          })}
        </div>
        <Message />
      </div>
    );
  }
}
