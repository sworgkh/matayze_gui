import React from 'react'
import Image from '../assets/logo.png'

const logoStyle = {
  width: 85,
  height: 135,
  display: 'block',
  background: `url(${Image})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat'
}

const Logo = (props) => {
  return (
    <div style={props.style}>
      <div style={logoStyle} />
    </div>
  )
}

export default Logo;