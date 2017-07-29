import React from 'react';
import {
  HashRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import Header from './Header';
import Users from './Users';
import './App.css';

var config = {
   apiKey: "AIzaSyAqsquOVAUkNol9l7QttoTI1s3zXNA32Fw",
   authDomain: "christianminglebutbetter.firebaseapp.com",
   databaseURL: "https://christianminglebutbetter.firebaseio.com",
   projectId: "christianminglebutbetter",
   storageBucket: "christianminglebutbetter.appspot.com",
   messagingSenderId: "904563004940"
};
firebase.initializeApp(config);

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
    return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route exact path="/" component={AppHome}/>
            <Route path="/users/:id" component={AppUsers}/>
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
