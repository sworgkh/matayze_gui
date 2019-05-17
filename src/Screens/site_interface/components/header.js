import React from 'react'
import Typography from '@material-ui/core/Typography'

const Header = (props) => {
  return (
    <div style={props.style}>
      <Typography style={{ color: '#FFFFFF', textAlign: 'center'}} variant='h3'>
        Event Schedule
      </Typography>
    </div>
  )
}

export default Header;