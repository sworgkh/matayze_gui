import React from 'react';
import AppBar from './AppBar'
import Card from './Card_with_hall'

//<Card header={"New card"} img={require("./Screens/management_interface/1.png")} text={"Hello to our new card,it has a lot of stuff and much to do yet"}/>import Card


export default class managementIndex extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <h1>BLA</h1>
                {/*<AppBar/>*/}
                {/*<Card/>*/}
            </div>
        );
    }

}