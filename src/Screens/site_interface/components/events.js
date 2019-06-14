import React, { Component} from 'react'
import env_vars from '../../../ENV_VAR'
import BigCalendar from 'react-big-calendar'
import CalendarToolbar from './toolbar'
import eventPopup from './eventPopup'
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
      popup: false,
      popupEvent: {},
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
              room: item.room
            }
          ]
        }))
      }))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate() {
    if(this.state.width < 600 && this.state.view !== 'agenda')
      this.setState({view: 'agenda'}, () => console.log(this.state.view))
  }

  updateWindowDimensions() {
    this.setState(({width: window.innerWidth}))
  }

  render(){
    return (
      <div style={styles.container}>
        { eventPopup(this.state.popupEvent, this.state.popup, () => this.setState({popup: false})) }
        <BigCalendar
          style={{color: '#FFFFFF'}}
          defaultView={'agenda'}
          tooltipAccessor={event => '\n' + event.title + '\nRoom ' + event.room + '\nLecturer' +  event.lecturer + '\n' +  event.description}
          events={this.state.events}
          views={allViews}
          view={this.state.view}
          onView={view => this.setState({view})}
          step={30}
          length={7}
          getNow={() => null}
          defaultDate={new Date()}
          min={new Date(2019, 10, 0, 8, 0, 0)}
          max={new Date(2019, 10, 0, 22, 0, 0)} 
          eventPropGetter={() => ({ className:'events'})}
          onDoubleClickEvent={event => this.setState({popupEvent: event, popup: true})}
          components={{
            event: Event,
            agenda: {
              event: EventAgenda
            },
            toolbar: CalendarToolbar,
            week: {
              event: EventWeek
            }
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

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      <span> (Room {event.room})</span>
    </span>
  )
}

function EventWeek({ event }) {
  return (
    <span>
      <strong style={{fontSize: 14}}>{event.title}</strong>
    </span>
  )
}

export default Events