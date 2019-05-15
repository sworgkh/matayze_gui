import React, { Component } from 'react'
import Moment from 'react-moment'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = {
  container: {
    margin: 'auto',
    width: '50%'
  },
  card: {
    position: 'relative',
    width: '100%',
    minHeight: 200,
    padding: 10,
    margin: 10
  },
  content: {
    position: 'absolute',
    left: 120
  },
  time: {
    position: 'absolute',
    left: 5,
    top: 5
  }
}

class Events extends Component {
  constructor(props){
    super(props)
    this.state = {
      events : [
        {
          lecture: 'lecture',
          lecturer: 'lecturer',
          startTime: new Date('Wed May 15 2019 16:00:00 GMT+0300'),
          endTime: new Date('Wed May 15 2019 19:00:00 GMT+0300'),
          room: '1',
          message: 'test: this is a message describing the conference event'
        },
        {
          lecture: 'lecture2',
          lecturer: 'lecturer2',
          startTime: new Date('Wed May 15 2019 18:00:00 GMT+0300'),
          endTime: new Date('Wed May 15 2019 21:00:00 GMT+0300'),
          room: '2',
          message: 'test2: this is a message describing the conference event'
        },
        {
          lecture: 'lecture3',
          lecturer: 'lecturer3',
          startTime: new Date('Wed May 14 2019 15:00:00 GMT+0300'),
          endTime: new Date('Wed May 15 42019 17:00:00 GMT+0300'),
          room: '3',
          message: 'test3: this is a message describing the conference event'
        }
      ]
    }

    this.renderEvents = this.renderEvents.bind(this)
  }

  renderEvents(item, i){
    return (
      <Card key={i} style={styles.card}>
        <CardContent style={styles.content}>
          <Typography color="textSecondary" gutterBottom>
            Room {item.room}
          </Typography>
          <Typography variant="h5" component="h2">
            {item.lecture}
          </Typography>
          <Typography color="textSecondary">
            {item.lecturer}
          </Typography>
          <Typography style={{paddingTop: 5}} component="p">
            {item.message}
          </Typography>
        </CardContent>
        <CardContent style={styles.time}>
              <Moment format='HH:mm'>{item.startTime}</Moment> 
              - 
              <Moment format='HH:mm'>{item.endTime}</Moment>
        </CardContent>
      </Card>
    )
  }

  render(){
        return <div style={styles.container}>
            { this.state.events.sort((a,b) => a.startTime - b.startTime).map(this.renderEvents)}
        </div>
  }
}

export default Events