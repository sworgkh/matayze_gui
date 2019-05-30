import React, { Component } from "react";
const moment = require("moment");
moment().format();

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80vw",
    height: "10vw",
    margin: "0 auto",
    color: "#fff"
  },
  lectureLeft: {
    display: "flex",
  },
  lecturerImg: {
    // display: "block",
    width: "8vw",
    height: "8vw",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    borderRadius: "100%"
  },
  lectureDetails: {
    marginLeft: "2vw",
    width: "80%"
  },
  lectureTitle: {
    fontSize: "1.8vw"
  },
  lecturerName: {
    fontSize: "1.5vw"
  },
  timeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  timeAndDate: {
    fontSize: "3vw",
  },
  room: {
    fontSize: "2vw"
  },
  devider: {
    width: "80vw",
    margin: "0 auto"
  },
  lecturedescription: {
    fontSize: "1.2vw",
    paddingTop: "3vh",
    whiteSpace: "nowrap",
    width: 600,
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lecturerImg: ""
    };
  }

  render() {
    const { data } = this.props;
    const date = new Date(data.startDate);

    return (
      <div>
        <div style={styles.container}>
          <div style={styles.lectureLeft}>
            <img src={data.lecturer_image} style={styles.lecturerImg} />
            <div style={styles.lectureDetails}>
              <h2 style={styles.lectureTitle}>{data.lecture}</h2>
              <h3 style={styles.lecturerName}>{data.lecturer}</h3>
              <p style={styles.lecturedescription}>{data.description}</p>
            </div>
          </div>
          <div style={styles.timeContainer}>
            <p style={styles.timeAndDate}>
              {date.getHours()}:{date.getMinutes()}
            </p>
            <p style={styles.room}>Room {data.room}</p>
          </div>
        </div>
        <hr style={styles.devider} />
      </div>
    );
  }
}

export default Card;
