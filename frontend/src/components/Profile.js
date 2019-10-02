import React, { Component } from 'react';
import { MyContext } from '../context/index';
import Navbar from './Navbar';
import AUTH_SERVICE from '../services/auth';

function CardInfo(props) {
  const category = props.category;
  if (category === 'Student') {
    return (
      <div>
        <p>Carreras:</p>
        <p>Resultados Test Hermann:</p>
      </div>
    )
  }
  return (
    <div>
      <p>Biografía</p>
      <p>Título:</p>
    </div>
  )  
}

export default class Profile extends Component {

  componentDidMount() {
    if (!this.context.state.loggedUser) return this.props.history.push('/auth/login');
    AUTH_SERVICE.profile()
      .then((response) => {
        this.context.logUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="">
          <section className="columns">
            <aside className="menu column is-2 aside-menu">
              <p className="menu-label">
                General
              </p>
              <ul className="menu-list">
                <li>Dashboard</li>
                <li>Customers</li>
              </ul>
            </aside>
            <div className="column is-10 section">
              <div className="columns">
                <div className="column is-4 has-text-centered">
                  <figure className="image profile-image">
                    <img className="is-rounded" src={this.context.state.loggedUser.profile.image} alt="profile"/>
                  </figure>
                  <a class="button secondary is-small">Editar imagen</a>
                </div>
                <div className="column is-8">
                  <div class="card">
                    <div class="card-content">
                      <p class="subtitle">
                        Bienvenido a tu perfil<br></br>
                        <small>{this.context.state.loggedUser.email}</small>
                      </p>
                      <p>Name: {this.context.state.loggedUser.profile.name}</p>
                      <CardInfo category={this.context.state.loggedUser.category}/>
                    </div>
                    <footer class="card-footer">
                      <p class="card-footer-item">
                        <a class="button secondary">
                          <span class="icon">
                            <i class="fas fa-pencil-alt"></i>
                          </span>
                          <span>Editar</span>
                        </a>
                      </p>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <p>Para poder orientarte mejor en la búsqueda de carreras y profesionistas te pedimos que realices el siguiente test. El tiempo aproximado es de 20 min, considera este tiempo antes de iniciar.</p>
              <a class="button secondary">Tomar Test</a>
            </div>
          </section>
        </div>
      </div>
    )
  }                
}

Profile.contextType = MyContext;