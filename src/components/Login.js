import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

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
      <div>
        <h1>Login</h1>
        <label>
           Email
          <input type="text" placeholder="Enter Email" required ref={(e) => this.email = e}/>
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter Password" required ref={(e) => this.password = e}/>
        </label>
        <button onClick={() => this.login()} type="button">Login</button>
      </div>
    );
  }
}
export default withRouter(Login)
