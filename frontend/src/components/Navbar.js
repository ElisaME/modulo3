import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { MyContext } from '../context/index';
import logo from '../images/logo_1.gif';

function logout(){
  localStorage.clear()
  window.location.href='/'
}

function MenuOptions(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start burger">
          <Link className="navbar-item menu-item" to="/auth/profile">Perfil</Link>
          <Link className="navbar-item menu-item" to="/allCareers">Carreras</Link>
          <Link className="navbar-item menu-item" to="/test">Test</Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={logout} className="button nav-button secondary"><strong>Log out</strong></button>
              {/* <Link className="has-text-black" to="/auth/logout"><button className="button nav-button secondary"><strong>Log out</strong></button></Link> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/auth/signup"><button className="button nav-button secondary"><strong>Sign up</strong></button></Link>
            <Link to="/auth/login"><button className="button nav-button secondary"><strong>Log in</strong></button></Link>
          </div>
        </div>
      </div>
    </div>
  )  
}

export default class Navbar extends Component {
  //FUncionalidad para menú de hamburguesa
  ham = (e) => {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('#'+burger.dataset.target);
  
      burger.classList.toggle('is-active');
      nav.classList.toggle('is-active');
  }

  render() {
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item nav-logo">
              <img src={logo} alt="logo"/>
            </Link>
            <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={this.ham}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <MenuOptions isLoggedIn={this.context.state.loggedUser}/>
        </nav>
      </div>
    )
  }
}

Navbar.contextType = MyContext;