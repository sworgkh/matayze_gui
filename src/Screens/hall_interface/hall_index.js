import React from 'react';

import Card from './components/Card'

const styles = {
    pageContainer: {
        width: "100vw",
        height: "100vh",
        backgroundImage: 'linear-gradient(to top left, purple, black)',
    }
}

export default class hall_index extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div style={styles.pageContainer}>
                <Card />
                <Card />
                <Card />
            </div>
        );
    }

}