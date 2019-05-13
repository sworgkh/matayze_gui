import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Screens/management_interface/Card_with_hall'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>Hello people, this is our project, we shall use only <a href="https://material-ui.com/">material-ui.com</a> for this project</p>
          <p>Before you write a component check if you can find it there.</p>
          <Card header={"New card"} img={require("./Screens/management_interface/1.png")} text={"Hello to our new card,it has a lot of stuff and much to do yet"}/>
      </header>
    </div>
  );
}

export default App;
