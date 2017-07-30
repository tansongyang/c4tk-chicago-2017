import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import './Header.css';

class Home extends Component {
  logout() {
    firebase.auth().signOut().then(() => {
        this.props.history.push({
          pathname: '/login'
        })
    });
  }

  render() {
    return (
      <header className="Header">
        <span>Not an Island</span>
        <button onClick={() => this.logout()}>Logout</button>
      </header>
    );
  }
}
export default (withRouter(Home))
