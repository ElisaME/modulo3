import React, { Component } from 'react';
import AUTH_SERVICE from '../services/auth';
import { MyContext } from '../context/index';

class Login extends Component {
  state = {
    user: {}
  };

  handleInput = (e) => {
    const { user } = this.state;
    const key = e.target.name;
    user[key] = e.target.value;
    this.setState({ user });
  };

  onSubmit = (e) => {
    e.preventDefault();
    AUTH_SERVICE.login(this.state.user)
      .then((response) => {
        this.context.logUser(response.data.user);
        this.props.history.push('/auth/profile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
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
                    <h1 class="title has-text-centered">Iniciar Sesión</h1>
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
                            <input name="password" onChange={this.handleInput} class="input" type="password" placeholder="******"/>
                            <span class="icon is-small is-left">
                              <i class="fas fa-key"></i>
                            </span>
                          </div>
                        </div>
                        <div class="field">
                          <div class="control">
                            <button type="submit" class="button secondary is-medium">Entrar</button>
                          </div>
                        </div>
                      </form>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
    );
  }
}

Login.contextType = MyContext;

export default Login;