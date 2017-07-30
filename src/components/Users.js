import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import './Users.css';

const ignoredKeys = [
  'key',
  'photoUrl',
  'provider',
  'quote',
  'strengths',
  'weaknesses'
];

export default class Users extends React.Component {
  render() {
    const selectedId = this.props.match.params.id;
    const user = this.props.users.filter((u) => {
      return u.key === selectedId;
    })[0];
    if (!user) {
      return (
        <Redirect to="/"/>
      )
    }
    const keys = Object.keys(user).filter((k) => {
      return ignoredKeys.indexOf(k) < 0;
    })
    return (
      <div>
        <img className="Users-photo"src={user.photoUrl}/>
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
        <ul>
          {this.props.users
            .filter((u) => {
              return u.key !== selectedId;
            })
            .map((u) => {
              return (
                <li key={u.key}>
                  <Link to={`/users/${selectedId}/call/${u.key}`}>
                    {u.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
