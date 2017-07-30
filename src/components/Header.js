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
        <span className="Header-title">notanisland</span>
        {firebase.auth().currentUser && (
          <span>
            <span className="Header-welcome">Welcome back, {firebase.auth().currentUser.email}!</span>
            <button classname="Header-logout" onClick={() => this.logout()}>Logout</button>
          </span>
        )}
      </header>
    );
  }
}
export default (withRouter(Home))
