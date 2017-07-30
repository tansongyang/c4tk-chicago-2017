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
  componentDidMount: function() {
    const ref = firebase.database().ref('Users');
    ref.once('value').then((snapshot) => {
      const val = snapshot.val();
      const users = [];
      for (const key in val) {
        const u = val[key];
        u.key = key;
        users.push(u);
      }
      this.setState({ users });
    });
  },
  render: function() {
    const AppHome = (props) => {
      return (
        <Home users={this.state.users} {...props}/>
      );
    };
    const AppUsers = (props) => {
      return (
        <Users users={this.state.users} {...props}/>
      );
    }
    const AppCall = (props) => {
      return (
        <Call users={this.state.users} {...props}/>
      );
    }
    return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route exact path="/" component={AppHome}/>
            <Route exact path="/users/:id" component={AppUsers}/>
            <Route path="/users/:id/call/:target" component={AppCall}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    );
  }
});

export default App;

function Home(props) {
  return (
    <div>
      Home
      <ul>
        {props.users.map((u) => {
          return (
            <li key={u.key}>
              <Link to={`/users/${u.key}`}>
                {u.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function NoMatch() {
  return (
    <div>404</div>
  );
}
