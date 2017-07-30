// https://gist.github.com/fdidron/ebcf52dc1ed62ff7d80725854d631a9e
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const PUBLIC_ROOT = '/';

const AuthRoute = ({component, ...props}) => {
  if (props.path === PUBLIC_ROOT || isAuthenticated()) {
      return <Route { ...props } component={ component } />;
  }
  else {
      return <Redirect to={ PUBLIC_ROOT } />;
  }
};
export default AuthRoute;
