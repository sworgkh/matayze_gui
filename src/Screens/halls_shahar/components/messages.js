import React from 'react'
import Ticker from 'react-ticker'
import 'bootstrap/dist/css/bootstrap.css';


let message1 = "message1"
let message2 = "message2"
let message3 = "message3"
 
const MoveStuffAround = () => (
    <Ticker>
        {() => (
            <div>
            <h1>{message1} {message2} {message3} </h1>
            </div>
        )}
    </Ticker>
)
 
export default MoveStuffAround