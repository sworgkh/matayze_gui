import React, { Component } from 'react'
import Moment from 'react-moment'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import css from '../styles/style.css'

const styles = {
  container: {
    margin: 'auto'
  },
  card: {
    position: 'relative',
    width: '100%',
    minHeight: 120,
    marginTop: 10
  },
  content: {
    position: 'relative',
    width: '60%'
  },
  time: {
    position: 'absolute',
    left: '5%',
    top: 5
  },
  nav: {
    marginLeft: '2%'
  },
  button: {
    marginRight: '2%'
  }
}

class Events extends Component {
  constructor(props){
    super(props)
    this.state = {
      days: new Set(),
      selected: 1,
      events : [
        {
          lecture: 'Project Presentation',
          lecturer: 'Development Team',
          startTime: new Date('Sat Jun 1 2019 16:00:00 GMT+0300'),
          endTime: new Date('Sat Jun 1 2019 19:00:00 GMT+0300'),
          room: 'Conference Hall',
          description: 'The development team presents the project\'s software.'
        },
        {
          lecture: 'Cloud Lecture',
          lecturer: 'Development Team',
          startTime: new Date('Sat Jun 1 2019 18:00:00 GMT+0300'),
          endTime: new Date('Sat Jun 1 2019 21:00:00 GMT+0300'),
          room: 'Room 2',
          description: 'Learn about amazon web services.'
        },
        {
          lecture: 'Meeting',
          lecturer: 'Development Team',
          startTime: new Date('Wed May 31 2019 15:00:00 GMT+0300'),
          endTime: new Date('Wed May 31 42019 17:00:00 GMT+0300'),
          room: 'Room 3',
          description: 'Meet to discuss the project.'
        },
        {
          lecture: 'Test2 lecture',
          lecturer: 'Development Team',
          startTime: new Date('Sun Jun 2 2019 8:00:00 GMT+0300'),
          endTime: new Date('Sun Jun 2 42019 10:00:00 GMT+0300'),
          room: 'Room 1',
          description: 'This lecture is a test. Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description...'
        },
        {
          lecture: 'Event\'s End',
          lecturer: 'Development Team',
          startTime: new Date('Sun Jun 2 2019 9:00:00 GMT+0300'),
          endTime: new Date('Sun Jun 2 42019 12:00:00 GMT+0300'),
          room: 'Conference Hall',
          description: 'The last day of the event.'
        },
        {
          lecture: 'Test lecture',
          lecturer: 'Development Team',
          startTime: new Date('Sun Jun 1 2019 8:00:00 GMT+0300'),
          endTime: new Date('Sun Jun 1 42019 10:00:00 GMT+0300'),
          room: 'Room 1',
          description: 'This lecture is a test. Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description... Long description...'
        }
      ]
    }

    this.renderEvents = this.renderEvents.bind(this)
    this.calculateEventDaysAndSort = this.calculateEventDaysAndSort.bind(this)
    this.initDaysSet = this.initDaysSet.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.calculateEventDaysAndSort()
    this.initDaysSet()
  }

  calculateEventDaysAndSort(){
    let events = this.state.events.sort((a,b) => a.startTime - b.startTime)
    let prevDay = null
    let counter = 0
    events.forEach(event => {
        if(event.startTime.getDay() !== prevDay)
          counter += 1

        event.day = counter
        prevDay = event.startTime.getDay()
    })
    this.setState({events:events})
  }

  initDaysSet(){
    this.state.events.forEach(event => {
      this.state.days.add(event.day)
    })
  }

  handleClick(e) {
    this.setState({selected: parseInt(e.currentTarget.id)})
    console.log(this.state.selected)
  }

  renderEvents(item, i){
    return (
      <div key={i} >
        { this.state.selected === item.day &&
          <Card  style={styles.card}>
            <CardContent style={styles.content} className='eventContent'>
              <Typography variant="h5" component="h2">
                {item.lecture}
              </Typography>
              <Typography color="textSecondary">
                {item.lecturer}
              </Typography>
              <Typography style={{paddingTop: 5}} component="p">
                {item.description}
              </Typography>
            </CardContent>
            <CardContent style={styles.time}>
                  <Moment format='HH:mm'>{item.startTime}</Moment> 
                  - 
                  <Moment format='HH:mm'>{item.endTime}</Moment>
                  <Typography color="textSecondary" gutterBottom>
                    {item.room}
                  </Typography>
            </CardContent>
          </Card>
        }
      </div>
    )
  }

  render(){
    return (
      <div style={styles.container} className='eventContainer'>
        <div style={styles.nav}>
          { [...this.state.days].map(day => 
            <Button 
              style={styles.button} 
              key={day}
              id={day} 
              variant='contained' 
              onClick={this.handleClick}
              color={this.state.selected === day ? 'primary' : 'default'}
            >
              Day {day}
            </Button>) 
          }
        </div>
        { this.state.events.map(this.renderEvents)}
      </div>
    )
  }
}

export default Events