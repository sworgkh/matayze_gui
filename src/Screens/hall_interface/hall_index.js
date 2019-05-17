import React from "react";

import Card from "./components/Card";
import Time from "./components/Time";

import logo from "./assets/logo.png";

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
            justifyContent: "space-between",
            width: "80%",
            margin: "0 auto",
            alignItems: "center",
            height: "110px"
          }}
        >
          <h1 style={styles.heading}>Confrance Name</h1>
          <img src={logo} style={{ width: "70px", height: "90px" }} />
          <Time />
        </div>

        <hr />
        <div style={{ padding: "30px" }}>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    );
  }
}
