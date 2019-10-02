import React, { Component } from 'react';
import AUTH_SERVICE from '../services/auth';
import Navbar from './Navbar';

export default class Signup extends Component {
  state = {
    user:{}
  }

  handleInput = (e) => {
    const { user } = this.state;
    const key = e.target.name;
    user[key] = e.target.value;
    this.setState({ user });
  };

  onSubmit = (e) => {
    e.preventDefault();
    AUTH_SERVICE.signup(this.state.user)
      .then((response) => {
        console.log(response.data);
        this.props.history.push('/auth/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <section class="hero principal is-fullheight">
          <div class="hero-body">
              <div className="column is-half">
                <h1 class="title">
                  Fullheight title
                </h1>
              </div>
              <div className="column is-one-third">
                <div className="card">
                  <div className="card-content">
                    <h1 class="title has-text-centered">Regístrate</h1>
                      <form onSubmit={this.onSubmit}>
                        <div class="field">
                          <label class="label has-text-weight-normal">Correo electrónico:</label>
                          <div class="control has-icons-left">
                            <input name="email" onChange={this.handleInput} class="input" type="email" placeholder="Email input"/>
                            <span class="icon is-small is-left">
                              <i class="fas fa-envelope"></i>
                            </span>
                          </div>
                          {/* <p class="help is-danger">This email is invalid</p> */}
                        </div>
                        <div class="field">
                          <label class="label has-text-weight-normal">Contraseña:</label>
                          <div class="control has-icons-left">
                            <input name="password" onChange={this.handleInput} class="input" type="password" placeholder="Text input"/>
                            <span class="icon is-small is-left">
                              <i class="fas fa-key"></i>
                            </span>
                          </div>
                        </div>
                        <div class="field">
                          <div class="control">
                            <button type="submit" class="button secondary is-medium">Registrarse</button>
                          </div>
                        </div>
                      </form>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
    )
  }
}
