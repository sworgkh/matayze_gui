import React from "react";
import Clock from "react-live-clock";

const styles = {
  heading: {
    color: "white",
    fontSize: "2.8vw"
  }
};

export default class Time extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const date = new Date();
    return (
      <div style={styles.heading}>
        <Clock format={"HH:mm"} ticking={true} timezone={"Israel"} /> |{" "}
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </div>
    );
  }
}
