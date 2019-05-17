import React from 'react';
import logo from './logo.svg';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>Hello people, this is our project, we shall use only <a
                href="https://material-ui.com/">material-ui.com</a> for this project</p>
            <p>Before you write a component check if you can find it there.</p>
            <p>To access your folder use your rout: http://localhost:3000/interface_index</p>
            <p>To access your folder use your rout: http://localhost:3000/hall_index</p>
            <p>To access your folder use your rout: http://localhost:3000/management_index</p>
            <p>To access login use rout: http://localhost:3000/login</p>
          </header>
        </div>
    );
  }
}

export default App;
