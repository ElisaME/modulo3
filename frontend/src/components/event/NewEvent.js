import React, { Component } from 'react';
import AUTH_SERVICE from '../../services/auth';
import Navbar from '../Navbar';

export default class NewEvent extends Component {
  state={
    event:{}
  }

  handleInput = (e) => {
    const { event } = this.state;
    const key = e.target.name;
    event[key] = e.target.value;
    this.setState({ event });
    console.log(this.state.event)
  };

  onSubmit = (e) => {
    e.preventDefault();
    AUTH_SERVICE.newEvent(this.state.event)
      .then((response) => {
        console.log(response.data);
        this.props.history.push('/auth/profile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <section class="hero principal">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Nuevo Evento
              </h1>
              <h2 class="subtitle">
                Primary subtitle
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <form onSubmit={this.onSubmit}>
              <div class="field">
                <label class="label">Lugar:</label>
                <div class="control">
                  <input onChange={this.handleInput} name="place" class="input" type="text" placeholder="Text input"/>
                </div>
              </div>
              <div class="field">
                <label class="label">Fecha:</label>
                <div class="control">
                  <input onChange={this.handleInput} name="date" class="input" type="date" placeholder="Text input"/>
                </div>
              </div>
              <div class="field">
                <label class="label">Hora:</label>
                <div class="control">
                  <input onChange={this.handleInput} name="hour" class="input" type="time" placeholder="Text input"/>
                </div>
              </div>
              <div class="field">
                <label class="label">Duración:</label>
                <div class="control">
                  <select onChange={this.handleInput} name="duration">
                    <option>Selecciona una duración:</option>
                    <option>30 min</option>
                    <option>1 hr</option>
                    <option>1hr 30min</option>
                    <option>2 hr</option>
                  </select>
                </div>
              </div>
              <div class="field">
                <label class="label">Descripción:</label>
                <div class="control">
                  <input onChange={this.handleInput} name="description" class="input" type="text" placeholder="Text input"/>
                </div>
              </div>
              <div class="field">
                <label class="label">Número de invitados:</label>
                <div class="control">
                  <input onChange={this.handleInput} name="total_students" class="input" type="number" placeholder="Text input"/>
                </div>
              </div>
              <div class="field">
                <p class="control">
                  <button class="button secondary">
                    Crear
                  </button>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    )
  }
}
