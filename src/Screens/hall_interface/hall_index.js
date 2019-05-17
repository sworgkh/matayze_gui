import React from "react";

import Card from "./components/Card";
import Time from "./components/Time";

const styles = {
  pageContainer: {
    width: "100vw",
    height: "100vh",
    backgroundImage: "linear-gradient(to top left, purple, black)"
  },
  heading: {
    color: "white"
  }
};

export default class hall_index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.pageContainer}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={styles.heading}>Confrance Name</h1>
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "white"
            }}
          />
          <Time />
        </div>

        <hr />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}
