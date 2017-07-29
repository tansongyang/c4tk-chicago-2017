import React from 'react';
import { Redirect } from 'react-router-dom';
import './Users.css';

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
    return (
      <div>
        <img className="Users-photo"src={user.photoUrl}/>
      </div>
    );
  }
}
