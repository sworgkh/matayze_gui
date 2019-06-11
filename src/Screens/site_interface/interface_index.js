import React from 'react'
import Logo from './components/logo'
import Header from './components/header'
import Schedule from './components/events'

const styles = {
    containerStyle: {
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom right, black, purple)',
        overflow: 'auto',
        minHeight: 980
    },
    logoStyle: {
        position: 'absolute',
        top: 15,
        right: '1%'
    },
    headerStyle: {
        padding: '2%',
        margin: 'auto',
        paddingBottom: 30,
        width: '50%'
    }
}

export default class interface_index extends React.Component {
    render() {
        return (
            <div style={styles.containerStyle}>
                <Logo style={styles.logoStyle} />
                <Header style={styles.headerStyle} />
                <Schedule location = {this.props.location} />
            </div>
        )
    }
}