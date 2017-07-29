import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/profile" component={Profile}/>
              <Route component={NoMatch}/>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

function Home() {
  return (
    <div>Home</div>
  );
}

function Profile() {
  return (
    <div>Profile</div>
  );
}

function NoMatch() {
  return (
    <div>404</div>
  );
}

