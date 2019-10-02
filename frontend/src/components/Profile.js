import React, { Component } from 'react';
import { MyContext } from '../context/index';
import Navbar from './Navbar';

export default class Profile extends Component {
  componentDidMount() {
    if (!this.context.state.loggedUser) return this.props.history.push('/auth/login');
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <p>{this.context.state.loggedUser.email}</p>
+     </div>
    )
  }                
}

Profile.contextType = MyContext;