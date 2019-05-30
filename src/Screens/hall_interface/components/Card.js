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
    height: "80px",
    margin: "25px 0",
    color: "#fff"
  },
  lecturerImg: {
    display: "block",
    width: "80px",
    height: "80px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    borderRadius: "100%"
  },
  lectureLeft: {
    display: "flex"
  },
  lectureDetails: {
    marginLeft: "20px",
    width: "80%"
  },
  lectureTitle: {
    fontSize: "1.8rem"
  },
  lecturerName: {
    fontSize: "1.5rem"
  },
  timeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  timeAndDate: {
    fontSize: "1.8rem"
  },
  devider: {
    width: "80%",
    margin: "0 auto"
  },
  lecturedescription: {
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
            <p style={styles.timeAndDate}>Hall {data.room}</p>
          </div>
        </div>
        <hr style={styles.devider} />
      </div>
    );
  }
}

export default Card;
