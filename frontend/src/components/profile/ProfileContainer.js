import React, { Component } from 'react';
import { MyContext } from '../../context/index';
import AUTH_SERVICE from '../../services/auth';
import { Link } from 'react-router-dom';

export default class Profile extends Component {

  componentDidMount() {
    if (!this.context.state.loggedUser) return this.props.history.push('/auth/login');
    AUTH_SERVICE.profile()
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const category = this.context.state.loggedUser.category
    let info;
    if (category === 'Student') {
      info = <div>
            <p>Carreras:</p>
             <p>Resultados Test Hermann:</p>
            </div>
    } else {
      info = <div>
             <p>Biografía: {this.context.state.loggedUser.biography}</p>
             <p>Título: {this.context.state.loggedUser.degree}</p>
           </div>
    }
    return (
      <div>
        <div className="container">
          <h1 className="title">Datos Generales:</h1>
          <p className="subtitle">
              Bienvenido a tu perfil 
              <small> {this.context.state.loggedUser.email}</small>
          </p>
          <div className="columns">
            <div className="column is-3 has-text-centered">
              <figure className="image profile-image">
                <img className="is-rounded" src={this.context.state.loggedUser.image} alt="profile"/>
              </figure>
              <Link to="edit-profile"><button className="button secondary is-small">Editar Perfil</button></Link>  
            </div>
            <div className="column is-9">
              <p>Name: {this.context.state.loggedUser.name}</p>
              {info}
            </div>
          </div>
        </div>
      </div>
    )
  }                
}

Profile.contextType = MyContext;