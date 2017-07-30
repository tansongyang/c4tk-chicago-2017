import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import './Login.css';

class Login extends React.Component {
  login() {
    const email = this.email.value;
    const password = this.password.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
      console.log("Value: " + value);
      var user = firebase.auth().currentUser;
      console.log("User: " + user);

      if(user != null) {
        this.props.history.push({
          pathname: '/users/' + user.uid
        })
      }
    }).catch((value) => {
      console.log("Value: " + value);
      //deal with errors
      if(value.code === "auth/argument-error" || value.code === "auth/invalid-email"){
        alert("Enter a valid email");
      }
      else{
        alert("Incorrect username/ password!");
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <h1 className="Login-title">Login</h1>
        <div className="Login-controls">
          <div className="Login-controlRow">
            <label className="Login-controlLabel">
               Email
              <input type="text" placeholder="Enter Email" required ref={(e) => this.email = e}/>
            </label>
          </div>
          <div className="Login-controlRow">
            <label className="Login-controlLabel">
              Password
              <input type="password" placeholder="Enter Password" required ref={(e) => this.password = e}/>
            </label>
          </div>
          <button className="Login-button" onClick={() => this.login()} type="button">Log in</button>
        </div>
      </div>
    );
  }
}
export default withRouter(Login)
