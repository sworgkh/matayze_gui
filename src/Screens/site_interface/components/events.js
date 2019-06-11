import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import env_vars from '../../../ENV_VAR'
import { Redirect } from 'react-router-dom'
import BigCalendar from 'react-big-calendar'
import CalendarToolbar from './toolbar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../styles/style.css'

const styles = {
  container: {
    padding: '2%',
    margin: 'auto',
    position: 'relative',
    width: '90%',
    top: -50,
    height: '80%'
  },
}

const localizer = BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

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

    this.login = this.login.bind(this)
  }

  async componentDidMount() {
    if(this.props.location.state)
      this.setState({logged_in: true})

    await fetch(env_vars.api_link_get, {
      method: 'GET',
      crossDomain: true,
      headers: {
      'Authorization': "Bearer " + this.props.location.state.authToken,
      'Content-Type': 'application/json'
      } 
    })
      .then(response => response.json())
      .then(json => json.data.map((item, i) => {  
        return this.setState(prevState => ({
          events: [
            ...prevState.events, {
              title: item.lecture,
              lecturer: item.lecturer,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
              description: item.description,
              room: item.room
            }
          ]
        }))
      }))
  }

  login(){
    this.setState({ AWS_LOGIN: true })
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
      <div style={styles.container}>
        <BigCalendar
          style={{color: '#FFFFFF'}}
          defaultView={'agenda'}
          tooltipAccessor={event => 'Room ' + event.room + ' - ' + event.lecturer + ' - ' + event.description}
          events={this.state.events}
          views={allViews}
          step={30}
          getNow={() => null}
          showMultiDayTimes
          defaultDate={new Date()}
          min={new Date(2019, 10, 0, 8, 0, 0)}
          max={new Date(2019, 10, 0, 22, 0, 0)} 
          components={{
            event: Event,
            agenda: {
              event: EventAgenda
            },
            toolbar: CalendarToolbar
          }}
          localizer={localizer}
        />
      </div>
    )
  }
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta', fontSize: 30, paddingBottom: 10 }}>{event.title}</em>
      <p>Room {event.room} - {event.lecturer}</p>
      <p>{event.description}</p>
    </span>
  )
}

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      <p>Room {event.room}</p>
    </span>
  )
}

export default Events