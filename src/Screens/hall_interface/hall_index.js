import React from "react";

import Card from "./components/Card";
import Time from "./components/Time";
import Message from "./components/Message";

import logo from "./assets/logo.png";
import {relative} from "path";

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
          <img src={logo} style={{ position: "absolute",  left: "50%", marginLeft: "-50px", width: "70px", height: "90px" }} />
          <Time />
        </div>

        <hr />
        <div style={{ padding: "30px" }}>
          <Card />
          <Card />
          <Card />
        </div>
        <Message />
      </div>
    );
  }
}
