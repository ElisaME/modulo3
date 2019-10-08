import React, { Component } from 'react';
import AUTH_SERVICE from '../services/auth';
import {Link} from 'react-router-dom';

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
        <section className="hero principal is-fullheight">
          <div className="hero-body">
              <div className="column is-half">
                <h1 className="title">
                  Bienvenido
                </h1>
              </div>
              <div className="column is-one-third">
                <div className="card">
                  <div className="card-content">
                    <h1 className="title has-text-centered">Regístrate</h1>
                      <form onSubmit={this.onSubmit}>
                        <div className="field">
                          <label className="label has-text-weight-normal">Nombre:</label>
                          <div className="control has-icons-left">
                            <input name="name" onChange={this.handleInput} className="input" type="text" placeholder="Enter your name" required/>
                            <span className="icon is-small is-left">
                              <i className="fas fa-user"></i>                            </span>
                          </div>
                        </div>
                        <div className="field">
                          <label className="label has-text-weight-normal">Correo electrónico:</label>
                          <div className="control has-icons-left">
                            <input name="email" onChange={this.handleInput} className="input" type="email" placeholder="Email input" required/>
                            <span className="icon is-small is-left">
                              <i className="fas fa-envelope"></i>
                            </span>
                          </div>
                          {/* <p className="help is-danger">This email is invalid</p> */}
                        </div>
                        <div className="field">
                          <label className="label has-text-weight-normal">Contraseña:</label>
                          <div className="control has-icons-left">
                            <input name="password" onChange={this.handleInput} className="input" type="password" placeholder="Text input" required/>
                            <span className="icon is-small is-left">
                              <i className="fas fa-key"></i>
                            </span>
                          </div>
                        </div>
                        <div className="field">
                          <label className="label has-text-weight-normal">Soy:</label>
                          <div className="control">
                            <label className="radio">
                              <input type="radio" name="category" value="Student"/> Estudiante - busco orientación
                            </label><br></br>
                            <label className="radio">
                              <input type="radio" name="category" value="Mentor"/> Mentor - ofrezco orientación
                            </label>
                          </div>
                        </div>
                        <div className="field">
                          <label className="label has-text-weight-normal">Sobre mi:</label>
                          <div className="control has-icons-left">
                            <textarea name="biography" onChange={this.handleInput} className="input" type="text" placeholder="Comparte algo sobre ti..." />
                            <span className="icon is-small is-left">
                              <i className="fas fa-id-card"></i>
                            </span>
                          </div>
                        </div>
                        <div className="field">
                          <label className="label has-text-weight-normal">Título:</label>
                          <div className="control has-icons-left">
                            <input name="degree" onChange={this.handleInput} className="input" type="text" placeholder="Comparte algo sobre ti..." />
                            <span className="icon is-small is-left">
                              <i className="fas fa-graduation-cap"></i>
                            </span>
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <button type="submit" className="button secondary is-medium">Registrarse</button>
                          </div>
                          <small>¿Ya tienes cuenta? <Link to="/auth/login">Inica sesión</Link></small>
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
