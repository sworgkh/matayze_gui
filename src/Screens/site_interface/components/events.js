import React, { Component, Children } from 'react'
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
      events: [],
      view: 'agenda',
      width: window.innerWidth
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions)

    let bearer = "Bearer " + this.props.location.state.authToken

    await fetch(env_vars.api_link_get, {
      method: 'GET',
      crossDomain: true,
      headers: {
      'Authorization': bearer,
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
              room: item.room,
              width: window.innerWidth
            }
          ]
        }))
      }))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState(prevState => ({
      width: window.innerWidth,
      events: prevState.events.map((item, i) => ({...item,width: window.innerWidth}))
    }))
  }

  render(){
    return (
      <div style={styles.container}>
        <BigCalendar
          style={{color: '#FFFFFF'}}
          defaultView={'agenda'}
          tooltipAccessor={event => 'Room ' + event.room + ' - ' + event.lecturer + ' - ' + event.description}
          events={this.state.events}
          views={allViews}
          view={this.state.width < 600 ? this.state.view : BigCalendar.view}
          step={30}
          length={7}
          getNow={() => null}
          showMultiDayTimes
          defaultDate={new Date()}
          min={new Date(2019, 10, 0, 8, 0, 0)}
          max={new Date(2019, 10, 0, 22, 0, 0)} 
          eventPropGetter={eventStyleGetter}
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
      <em className="Eventlist">{event.title}</em>
      <p>Room {event.room} - {event.lecturer}</p>
      <p>{event.description}</p>
    </span>
  )
}

function eventStyleGetter (event) {
  var style = {
    fontSize: event.width < 600 ? 10 : 20,
    padding: 0,
    margin: 0
  }
  return {
      style: style
  }
}

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      <span> - Room {event.room}</span>
    </span>
  )
}

export default Events