import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Test from './components/Test';
import Profile from './components/profile/ProfileContainer';
import EditProfile from './components/profile/EditProfile';
import Navbar from './components/Navbar';

const Router = () => (
  <BrowserRouter>
    <Navbar></Navbar>
    <Switch>
      <Route exact path="/auth/signup" component={Signup} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/profile" component={Profile} />
      <Route exact path="/test" component={Test}/>
      <Route exact path="/auth/edit-profile" component={EditProfile} />
    </Switch>
  </BrowserRouter>
);

export default Router;