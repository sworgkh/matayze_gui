import React from 'react'
import Logo from './components/logo'
import Header from './components/header'
import Schedule from './components/events'

const styles = {
    containerStyle: {
        position: 'relative'
    },
    logoStyle: {
        position: 'absolute',
        right: '5%'
    },
    headerStyle: {
        padding: '2%',
        margin: 'auto',
        width: '50%'
    }
}

export default class interface_index extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={styles.containerStyle}>
                <Logo style={styles.logoStyle} />
                <Header style={styles.headerStyle} />
                <Schedule />
            </div>
        )
    }
}