import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar';

export default class CareerDetail extends Component {
  state={
    career:{},
    mentors:[]
  }

  componentDidMount(){
    axios
    .get(`http://localhost:3000/api/career/${this.props.match.params.id}`)
    .then(({ data: { career, mentors }}) => this.setState({ career, mentors }))
    .catch((error) => {console.log(error)});
  }

  truncate = (str) => {
    return str.length > 10 ? str.substring(0, 55) + "..." : str;
  }

  render() {
    const {career, mentors} = this.state
    return (
      <div>
        <Navbar></Navbar>
        <p>Nombre: {career.name}</p>
        <p>Descripción: {career.description}</p>
        <p>Ingreso Promedio:{career.income}</p>
        <p>Área: {career.area}</p>
        <p>Campo de Trabajo: {career.field}</p>
        <section className="section">
        {mentors.map((mentor) => (
          <div class="card card-mentor">
            <div class="card-image">
              <figure class="image">
                <img className="profile-img" src={mentor.image} alt="profile"/>
              </figure>
            </div>
            <div class="card-content  has-background-light">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="career"/>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{mentor.name}</p>
                </div>
              </div>
              <div class="content">
                {this.truncate(mentor.biography)}
              </div>
            </div>
            <footer class="card-footer principal">
                <Link to={`/mentor/${mentor._id}`} className="card-footer-item link_1"><i class="fas fa-lg fa-plus-circle"></i></Link>
                <Link className="card-footer-item link_1"><i class="far fa-lg fa-calendar-check"></i></Link>
                <Link className="card-footer-item link_1"><i class="far fa-lg fa-envelope"></i></Link>
              </footer>
          </div>
        ))}   
        </section>
      </div>
    )
  }
}
