import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from "react-router-dom"
import Button from "@material-ui/core/Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      val:'',
      token:''
    }


    this.login = this.login.bind(this)
    this.management_index = this.management_index.bind(this)
    this.hall_index = this.hall_index.bind(this)
    this.interface_index = this.interface_index.bind(this)
  }

  componentDidMount() {
    let a = this.props.location.hash
    a = a.toString().split('&')

    if (a[0]) {
      let token = a[0]

      token = token.slice(10, token.length)
      if (token) {
          this.setState({token:token,val:'management_index'})

        // var url = "https://h4vq14noj4.execute-api.eu-west-1.amazonaws.com/dev/lectures";
        // var bearer = 'Bearer ' + token;
        // fetch(url, {
        //   method: 'GET',
        //   crossDomain: true,
        //   // withCredentials: true,
        //   // credentials: 'include',
        //   headers: {
        //     // 'Access-Control-Allow-Origin': '*',
        //     'Authorization': bearer,
        //     'Content-Type': 'application/json'
        //   }
        // }).then(response => response.json())
        //     .then(responseJson => {
        //       console.log(responseJson);
        //
        //     })
      }


      //   var obj = {
      //     link: 'https://h4vq14noj4.execute-api.eu-west-1.amazonaws.com/dev/lectures',
      //     object: {
      //       method: 'GET',
      //       headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json',
      //         'Authorization': 'Bearer ' + token,
      //         // 'Host': 'localhost:3000'
      //         // 'Host': 'https://h4vq14noj4.execute-api.eu-west-1.amazonaws.com'
      //       }
      //     }
      //   };
      //   fetch('https://h4vq14noj4.execute-api.eu-west-1.amazonaws.com/dev/lectures', obj)
      //       .then((response) => {
      //         console.log(response)
      //       })
      //       .then((responseData) => {
      //         console.log(responseData);
      //       })
      //   // this.setState({val:'management_index'})
      //   console.log("WOW")
      // }
    }






    //https://matayze.s3-website-eu-west-1.amazonaws.com/?code=887bcc2c-42a1-41d5-b773-b07486d46cb1



    //check for token
      // fetch('https://auth.matayze.shenkar.cloud/login?response_type=token&client_id=3uslmcib25uq3sah74hp6lgvr9&redirect_uri=http://matayze.s3-website-eu-west-1.amazonaws.comm')
    //     .then(response => {
    //       console.log(response.json())
    //     } )
    //     .then(data => this.setState({ data }));
    //


    // this.setState({val:''})
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




  render() {
    switch (this.state.val) {
      case 'login':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/login',
          state: { logged_in: false,authToken: this.state.token }
        }}/>
      }
      case 'management_index':
      {
        let logged_in = false
        if(this.state.token !== ''){
          logged_in = true
        }
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/management_index',
          state: { logged_in: logged_in, authToken: this.state.token }
        }}/>
      }
      case 'hall_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/hall_index',
          state: { logged_in: false , authToken: this.state.token}
        }}/>
      }
      case 'interface_index':
      {
        this.setState({val:''})
        return  <Redirect  to={{
          pathname: '/interface_index',
          state: { logged_in: false , authToken: this.state.token }
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
