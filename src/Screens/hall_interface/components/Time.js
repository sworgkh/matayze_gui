import React from "react";
import Clock from "react-live-clock";

const styles = {
  heading: {
    color: "white",
    fontSize: "1.8em"
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
        <Clock format={"HH:mm"} ticking={true} timezone={"Israel"} />|{" "}
        {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
      </div>
    );
  }
}
