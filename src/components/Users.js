import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import firebase from 'firebase';
import './Users.css';

const ignoredKeys = [
  'average',
  'key',
  'photoUrl',
  'provider',
  'quote',
  'score',
  'strengths',
  'totalConvos',
  'weaknesses',
];

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    const ref = firebase.database().ref('Users').child(currentUser.uid);
    ref.once('value').then((snapshot) => {
      const user = snapshot.val();
      this.setState({ user });
    });
  }

  render() {
    const selectedId = this.props.match.params.id;
    const currentUser = firebase.auth().currentUser;
    if (!currentUser || selectedId !== currentUser.uid) {
      return (
        <Redirect to="/"/>
      )
    }
    const { user } = this.state;
    if (!user) {
      return <div></div>;
    }
    const keys = Object.keys(user).filter((k) => {
      return ignoredKeys.indexOf(k) < 0;
    })
    return (
      <div>
        <img className="Users-photo"src={user.photoUrl}/>
        <span className="Users-stats">
          <span className="Users-pointIcon"></span>
          <span className="Users-points">{user.average}</span>
        </span>
        <form className="Users-form">
          {keys.map((k) => {
            return (
              <div>
                <label className="Users-label">
                  {k}
                  <input type="text"defaultValue={user[k]}/>
                </label>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}
