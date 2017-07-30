import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import './Header.css';

class Home extends Component {
  login() {
    this.props.history.push({
      pathname: '/login'
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.login();
    });
  }

  render() {
    const isLogin = this.props.location.pathname === '/login';
    return (
      <header className="Header">
        <span className="Header-title">notanisland</span>
        {firebase.auth().currentUser ? (
          <span>
            <span className="Header-welcome">Welcome back, {firebase.auth().currentUser.email}!</span>
            <button classname="Header-logout" onClick={() => this.logout()}>Log out</button>
          </span>
        ) : !isLogin && (
          <button classname="Header-login" onClick={() => this.login()}>Log in</button>
        )}
      </header>
    );
  }
}
export default (withRouter(Home))
