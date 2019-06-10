import React, { Component } from 'react'
import Moment from 'react-moment'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import env_vars from '../../../ENV_VAR'
import { Redirect } from 'react-router-dom'
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
      events : [],
      AWS_LOGIN: false,
      logged_in: false
    }

    this.renderEvents = this.renderEvents.bind(this)
    this.calculateEventDaysAndSort = this.calculateEventDaysAndSort.bind(this)
    this.initDaysSet = this.initDaysSet.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.login = this.login.bind(this)
  }

  async componentDidMount() {
    if(this.props.location.state)
      this.setState({logged_in: true})

    await fetch(env_vars.api_link + "lectures", {
      method: 'GET',
      crossDomain: true,
      headers: {
      'Authorization': "Bearer " + this.props.location.state.authToken,
      'Content-Type': 'application/json'
      } 
    })
      .then(response => response.json())
      .then(json => json.data.map((item, i) => this.setState(prevState => ({
        events: [
          ...prevState.events, {
            lecture: item.lecture,
            lecturer: item.lecturer,
            startTime: new Date(item.startDate),
            endTime: new Date(item.endDate),
            room: item.room,
            description: item.description
          }
        ]
      }), () => { 
        if(json.data.length -1 === i) {
          this.calculateEventDaysAndSort()
          this.initDaysSet()
        }
      })))
  }

  login(){
    this.setState({ AWS_LOGIN: true })
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
                    Room {item.room}
                  </Typography>
            </CardContent>
          </Card>
        }
      </div>
    )
  }

  render(){
    if (!this.state.logged_in && this.state.AWS_LOGIN) {
      this.setState({ AWS_LOGIN: false })
      return <Redirect
          to={{
              pathname: '/login',
              state: { logged_in: false }
          }} />
    }

    if(!this.state.logged_in){
        return (
            <div style={styles.pageContainer}>
                <Button variant="outlined" color="primary"  onClick={this.login} style={{color:'white',margin:20}}>login</Button>
            </div>
        )
    }

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