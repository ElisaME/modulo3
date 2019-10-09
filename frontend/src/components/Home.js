import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="header"></div>
        <section class="hero secondary has-text-centered">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Una herramienta para ayudarte en tu decisión.
              </h1>
              <h2 class="subtitle">
                Obtén la información que necesitas
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container has-text-centered">
            <h2 className="title">¿Cómo funciona?</h2>
            <div className="columns has-text-centered">
              <div className="column is-centered">
                <i className="home-icon far fa-clipboard fas fa-3x"></i>
                <h3>Paso 1</h3>
                <p>Blablablablablabla</p>
              </div>
              <div className="column has-text-centered">
                <i className="home-icon far fa-clipboard fas fa-3x"></i>
                <h3>Paso 1</h3>
                <p>Blablablablablabla</p>
              </div>
              <div className="column has-text-centered">
                <i className="home-icon far fa-clipboard fas fa-3x"></i>
                <h3>Paso 1</h3>
                <p>Blablablablablabla</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
