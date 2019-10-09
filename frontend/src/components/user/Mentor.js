import React, { Component } from 'react'
import Axios from 'axios';
import Navbar from '../Navbar';

export default class Mentor extends Component {
  state = {
    user:{},
    events:[]
  }
  componentDidMount(){
    //if (!this.context.state.loggedUser) return this.props.history.push('/auth/login');
    Axios.get(`http://localhost:3000/api/user/${this.props.match.params.id}`)
    .then((response) => {
      this.setState({user:response.data.user, events:response.data.events})
    })
    .catch((error) => console.log(error))
  }
  render() {
    const {user, events} = this.state
    return (
      <div>
        <Navbar></Navbar>
        <section class="hero secondary">
          <div class="hero-body">
            <div class="container">
              <figure class="mentor-image image is-128x128 is-pulled-left">
                <img class="is-rounded" src={user.image} alt="mentor"/>
              </figure>
              <h1 class="title">
                {user.name}
              </h1>
              <h2 class="subtitle">
                {user.degree}
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-6">
                <h2 className="subtitle">Sobre mí</h2>
                <p className="has-text-justified bio-mentor">{user.biography}</p>
              </div>
              <div className="column is-6">

                <h2 className="subtitle">Próximos eventos:</h2>
                  {events.map((event) => (
                    <div className="card events-list">
                    <p>Fecha: {event.date} a las {event.hour}</p>
                    <p>Place</p>
                    <p>Descripción: {event.description}</p>
                    <p>Duración: {event.duration}</p>
                    <p>Lugares disponibles:{event.total_students}</p>
                    <button className="button principal">Unirse</button>
                    </div>
                  ))} 
              </div>
            </div>  
          </div> 
        </section>
      </div>
    )
  }
}
