import React from 'react'
import Popup from 'reactjs-popup'
import Moment from 'react-moment'

export default (event, open, onClose) => (
  <Popup contentStyle={{border:'none', backgroundColor: 'purple'}} open={open} onClose={onClose}>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> 
          {event.title}        
          <p style={{fontSize: 12}}>
            Lecturer: {event.lecturer}
          </p> 
          <p style={{fontSize: 12}}>
            Room {event.room} -  <span> </span>
            <Moment format='HH:mm'>{event.start}</Moment>
            -
            <Moment format='HH:mm'>{event.end}</Moment>
          </p>
        </div>
        <p className="content">
          {event.description}
        </p>
      </div>
    )}
  </Popup>
)