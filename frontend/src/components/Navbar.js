import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { MyContext } from '../context/index';

function MenuOptions(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <div className="buttons menu">
        <Link to="/auth/logout"><button className="button secondary"><strong>Log out</strong></button></Link>
      </div>
    )
  }
  return (
    <div className="buttons menu">
      <Link to="/auth/signup"><button className="button secondary"><strong>Sign up</strong></button></Link>
      <Link to="/auth/login"><button className="button secondary"><strong>Log in</strong></button></Link>
    </div>
  )  
}

export default class Navbar extends Component {
  
  render() {
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo"/>
            </Link>
            <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <MenuOptions isLoggedIn={this.context.state.loggedUser}/>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

Navbar.contextType = MyContext;