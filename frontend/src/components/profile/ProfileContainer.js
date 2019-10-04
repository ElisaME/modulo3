import React, { Component } from 'react';
import { MyContext } from '../../context/index';
import AUTH_SERVICE from '../../services/auth';
import { Link } from 'react-router-dom';

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
        console.log(this.context.state.currentProfile)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="title">Datos Generales:</h1>
          <p className="subtitle">
              Bienvenido a tu perfil 
              <small>{this.context.state.loggedUser.email}</small>
          </p>
          <div className="columns">
            <div className="column is-3 has-text-centered">
              <figure className="image profile-image">
                <img className="is-rounded" src={this.context.state.loggedUser.profile.image} alt="profile"/>
              </figure>
              <Link to="edit-profile"><button className="button secondary is-small">Editar Perfil</button></Link>  
            </div>
            <div className="column is-9">
              <p>Name: {this.context.state.loggedUser.profile.name}</p>
              <CardInfo category={this.context.state.loggedUser.category}/>
            </div>
          </div>
        </div>
      </div>
    )
  }                
}

Profile.contextType = MyContext;