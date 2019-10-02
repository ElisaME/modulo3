import React, { Component } from 'react';
import AUTH_SERVICE from '../services/auth';
import { MyContext } from '../context/index';
import {Link} from 'react-router-dom';

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
        <section className="hero principal is-fullheight">
          <div className="hero-body">
              <div className="column is-half">
                <h1 className="title">
                  Fullheight title
                </h1>
              </div>
              <div className="column is-one-third">
                <div className="card">
                  <div className="card-content">
                    <h1 className="title has-text-centered">Iniciar Sesión</h1>
                      <form onSubmit={this.onSubmit}>
                        <div className="field">
                          <label className="label has-text-weight-normal">Correo electrónico:</label>
                          <div className="control has-icons-left">
                            <input name="email" onChange={this.handleInput} className="input" type="email" placeholder="Email input"/>
                            <span className="icon is-small is-left">
                              <i className="fas fa-envelope"></i>
                            </span>
                          </div>
                          {/* <p className="help is-danger">This email is invalid</p> */}
                        </div>
                        <div className="field">
                          <label className="label has-text-weight-normal">Contraseña:</label>
                          <div className="control has-icons-left">
                            <input name="password" onChange={this.handleInput} className="input" type="password" placeholder="******"/>
                            <span className="icon is-small is-left">
                              <i className="fas fa-key"></i>
                            </span>
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <button type="submit" className="button secondary is-medium">Entrar</button>
                          </div>
                          <small>¿Aún no tienes cuenta? <Link to="/auth/signup">Regístrate aquí</Link></small>
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