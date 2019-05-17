import React, {Component} from 'react'

import lecturerImg from '../assets/lecturer_1.png'

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        with: "80vw",
        height: "80px",
        margin: "25px 0",
        color: "#fff"
    },
    lecturerImg: {
        display: 'block',
        width: "80px",
        height: "80px",
        background: `url(${lecturerImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    lectureLeft: {
        display: "flex"
    },
    lectureDetails: {
      marginLeft: "20px"  
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
    }
}

class Card extends Component {
  render() {
      return (
        <div>
              <div style={styles.container}>
                <div style={styles.lectureLeft}>
                    <span style={styles.lecturerImg}></span>
                    <div style={styles.lectureDetails}>
                        <h2 style={styles.lectureTitle}>
                            Lecture Title                   
                        </h2>
                        <h3 style={styles.lecturerName}>
                            Speaker Name
                        </h3>
                        <p>
                            A Brief Summery Of the Lecture
                        </p>
                    </div>
                </div>
                    <div style={styles.timeContainer}>
                        <p style={styles.timeAndDate}>
                            18:00
                        </p>
                        <p style={styles.timeAndDate}>
                            Hall A
                        </p>
                    </div>
            </div>
            <hr style={styles.devider}></hr>
        </div>
    )
  }
}

export default Card
