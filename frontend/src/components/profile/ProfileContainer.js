import React, { Component } from 'react';
import { MyContext } from '../../context/index';
import AUTH_SERVICE from '../../services/auth';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import Axios from 'axios';
 

export default class Profile extends Component {
  
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      formIsHide:false,
      careers:[],
      newCareer:{},
      careerMentor:{},
      myCareers:[]
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({formIsHide: true})
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleInput = (e) => {
    const { newCareer } = this.state;
    const key = e.target.name;
    newCareer[key] = e.target.value;
    this.setState({ newCareer });
  }

  newCareer = (e) => {
    e.preventDefault();
    AUTH_SERVICE.createCareer(this.state.newCareer)
      .then((response) => {
        console.log(response.data);
        this.props.history.push('/auth/profile');
        this.setState({modalIsOpen:false})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSelect = e => {
    let { careerMentor } = this.state;
    careerMentor['career'] = e.target.value
    this.setState({careerMentor})
    console.log('>>>>>>' + this.state.careerMentor)
  }

  asignCareer = (e) =>{
    e.preventDefault();
    AUTH_SERVICE.asignCareer(this.state.careerMentor)
    .then((response) => {
      console.log(response);
      this.props.history.push('/auth/profile');
      this.setState({modalIsOpen:false})
    })
  }

  componentDidMount() {
    if (!this.context.state.loggedUser) return this.props.history.push('/auth/login');
    AUTH_SERVICE.profile()
      .then((response) => {
        this.setState({careers:[...response.data.careers], myCareers:[...response.data.user.careers]})
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {careers, myCareers} = this.state
    const category = this.context.state.loggedUser.category
    let info;
    let myCareersSelection;
    if (category === 'Student') {
      info = <div>
            <p>Carreras:</p>
             <p>Resultados Test Hermann:</p>
            </div>
      myCareersSelection = <p>Mis opciones de carrera:</p>
    } else {
      info = <div>
             <p>Biografía: {this.context.state.loggedUser.biography}</p>
             <p>Título: {this.context.state.loggedUser.degree}</p>
           </div>
      myCareersSelection = <p>Carreras de las que soy mentor:</p>
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
              <a onClick={this.openModal} type="button">Registrar carrera</a>
            </div>
          </div>
          <div>
            {myCareersSelection}
            <ul>
              {myCareers.map((career) => (
                <li>{career.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Elige una carrera para ser mentor:</p>
                <button onClick={this.closeModal} className="delete" aria-label="close"></button>
              </header>
              <section className="modal-card-body">
                <form onSubmit={this.asignCareer}>
                  <div class="field">
                    <label class="label">Carrera</label>
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select name="careerMentor" onChange={this.handleSelect}>
                          <option>Selecciona una carrera</option>
                          {careers.map((career) => (
                            <option key={career._id} value={career._id}>{career.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="button secondary">Guardar</button>
                </form>
                <p>¿No existe la carrera de la cual quieres ser mentor? Regístrala <span onClick={this.handleClick}>aquí.</span></p>
                <div className="new-career" hidden = {!this.state.formIsHide}>
                  <h2 className="subtitle">Registro de carrera:</h2>
                    <form onSubmit={this.newCareer}>
                      <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                          <input name="name" onChange={this.handleInput} class="input" type="text" placeholder="Ingenieria Civil"/>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                          <textarea name="description" onChange={this.handleInput} class="input" type="text"/>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Área</label>
                        <div class="control">
                          <input name="area" onChange={this.handleInput} class="input" type="text" placeholder="Área I"/>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Ingreso Promedio</label>
                        <div class="control">
                          <input name="income" onChange={this.handleInput} class="input" type="text" placeholder="$25,000 MXN"/>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Campo de trabajo</label>
                        <div class="control">
                          <input name="income" onChange={this.handleInput} class="input" type="text" placeholder="Campos de aplicación..."/>
                        </div>
                      </div>
                      <div class="control">
                        <button type="submit" class="button secondary">Registrar Carrera</button>
                      </div>
                    </form>
                  </div>
              </section>
            </div>
        </ReactModal>
        </div>
    )
  }                
}

Profile.contextType = MyContext;