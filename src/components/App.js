import React from 'react';
import {
  HashRouter as Router,
  Link,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import { requireAuth } from '../auth';
import Route from './AuthRoute';
import Call from './Call';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Users from './Users';
import './App.css';

const App = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      users: []
    };
  },
  render: function() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/users/:id" component={Users}/>
            <Route path="/users/:id/call/:target" component={Call}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    );
  }
});

export default App;

function NoMatch() {
  return (
    <div>404</div>
  );
}
