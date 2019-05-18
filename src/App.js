import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from "react-router-dom"
import Button from "@material-ui/core/Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={val:''}



    this.login = this.login.bind(this)
    this.management_index = this.management_index.bind(this)
    this.hall_index = this.hall_index.bind(this)
    this.interface_index = this.interface_index.bind(this)
  }

  login(){
    this.setState({val:'login'})
  }
  management_index(){
    this.setState({val:'management_index'})
  }

  hall_index(){
    this.setState({val:'hall_index'})
  }
  interface_index(){
    this.setState({val:'interface_index'})
  }

  componentDidMount() {
    this.setState({val:''})
  }


  render() {
    switch (this.state.val) {
      case 'login':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/login',
          state: { logged_in: false }
        }}/>
      }
      case 'management_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/management_index',
          state: { logged_in: false }
        }}/>
      }
      case 'hall_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/hall_index',
          state: { logged_in: false }
        }}/>
      }
      case 'interface_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/interface_index',
          state: { logged_in: false }
        }}/>
      }
      default:
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Hello people, this is our project, we shall use only <a
                    href="https://material-ui.com/">material-ui.com</a> for this project</p>
                <p>Before you write a component check if you can find it there.</p>
                {/*<p>To access your folder use your rout: http://localhost:3000/interface_index</p>*/}
                {/*<p>To access your folder use your rout: http://localhost:3000/hall_index</p>*/}
                {/*<p>To access your folder use your rout: http://localhost:3000/management_index</p>*/}
                <p>To access login use rout: <Button onClick={this.login} style={{color:'white'}}>/login</Button></p>
                <p>To access management_index use rout: <Button onClick={this.management_index} style={{color:'white'}}>/management_index</Button></p>
                <p>To access hall_index use rout: <Button onClick={this.hall_index} style={{color:'white'}}>/hall_index</Button></p>
                <p>To access interface_index use rout: <Button onClick={this.interface_index} style={{color:'white'}}>/interface_index</Button></p>
              </header>
            </div>
        );
    }


  }
}

export default App;
