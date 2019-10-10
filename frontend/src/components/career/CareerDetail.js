import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar';
import AUTH_SERVICE from '../../services/auth';

const isProduction = process.env.NODE_ENV === 'production'
const baseURL = isProduction ? 'https://arcane-plateau-89806.herokuapp.com/api' : 'http://localhost:3000/api'

export default class CareerDetail extends Component {
  state={
    career:{},
    mentors:[],
    user:{}
  }
  
  componentDidMount(){
    axios
    .get(`${baseURL}/career/${this.props.match.params.id}`)
    .then(({ data: { career, mentors }}) => this.setState({ career, mentors }))
    .catch((error) => {console.log(error)});
  }

  truncate = (str) => {
    return str.length > 10 ? str.substring(0, 55) + "..." : str;
  }

  sendMail = (mentor_id) => {
    axios
    .post(`${baseURL}/sendEmail/${mentor_id}`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  }

  render() {
    const {career, mentors} = this.state
    return (
      <div>
        <Navbar></Navbar>
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {career.name}
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="conainer">
            <p>Descripción: {career.description}</p>
            <p>Ingreso Promedio:{career.income}</p>
            <p>Área: {career.area}</p>
            <p>Campo de Trabajo: {career.field}</p>
          </div>
        </section>
        <section className="section">
          <h2 className="subtitle">Mentores</h2>
          {mentors.map((mentor) => (
            <div key={mentor._id} className="card card-mentor">
              <div className="card-image">
                <figure className="image">
                  <img className="profile-img" src={mentor.image} alt="profile"/>
                </figure>
              </div>
              <div className="card-content  has-background-light">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="career"/>
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{mentor.name}</p>
                  </div>
                </div>
                <div className="content">
                  {this.truncate(mentor.biography)}
                </div>
              </div>
              <footer className="card-footer principal">
                  <Link to={`/mentor/${mentor._id}`} className="card-footer-item link_1"><i className="fas fa-lg fa-plus-circle"></i></Link>
                  {/* <Link className="card-footer-item link_1"><i className="far fa-lg fa-calendar-check"></i></Link> */}
                  <span onClick={() => this.sendMail(mentor._id)} className="card-footer-item link_1"><i className="far fa-lg fa-envelope"></i></span>
                </footer>
            </div>
          ))}   
        </section>
      </div>
    )
  }
}
