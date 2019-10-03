import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Test from './components/Test';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/auth/signup" component={Signup} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/profile" component={Profile} />
      <Route exact path="/test" component={Test}/>
    </Switch>
  </BrowserRouter>
);

export default Router;