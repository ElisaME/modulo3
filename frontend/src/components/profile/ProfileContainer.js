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
      myCareers:[],
      careersBoxIsVisible:true,
      eventsBoxIsVisible:false,
      events:[]
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

  clickCareersBox = () => {
    this.setState({ careersBoxIsVisible: true, eventsBoxIsVisible: false})
  }
  clickEventsBox = () => {
    this.setState({ careersBoxIsVisible: false, eventsBoxIsVisible: true})
  }

  componentDidMount() {
    if (!this.context.state.loggedUser) return this.props.history.push('/auth/login');
    AUTH_SERVICE.profile()
      .then((response) => {
        this.setState({careers:[...response.data.careers], myCareers:[...response.data.user.careers],
        events:[...response.data.events]})
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {careers, myCareers, events} = this.state
    const category = this.context.state.loggedUser.category
    let info;
    let myCareersSelection;
    let eventType;
    let button1;
    let button2;
    if (category === 'Student') {
      info = <div>
            <p><span className="property">Carreras:</span> </p>
             <p><span className="property">Resultados Test Hermann: </span> </p>
            </div>
      myCareersSelection = <p>Mis opciones de carrera:</p>
      eventType='Eventos a los que asistiré'
      button1 = <button className="button is-small is-danger">Cancelar</button>
      button2 = <button className="button is-small is-info">Ver</button>
    } else {
      info = <div>
             <p><span className="property">Biografía: </span>  {this.context.state.loggedUser.biography}</p>
             <p><span className="property">Título: </span>  {this.context.state.loggedUser.degree}</p>
           </div>
      myCareersSelection = <p>Carreras de las que soy mentor:</p>
      eventType='Mis eventos:'
      button1 = <button className="button is-small is-danger">Eliminar</button>
      button2 = <button className="button is-small is-info">Editar</button>
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
              <div class="card profile-card">
                <div class="card-content">
                  <p><span className="property">Name: </span> {this.context.state.loggedUser.name}</p>
                  {info}
                </div>
              </div>
            </div>
          </div>
          
          <section className="section">
          <div class="tabs is-boxed">
            <ul>
              <li className={`careers ${this.state.careersBoxIsVisible ? ' is-active' : ' ' }`}   onClick={this.clickCareersBox}>
                <a>
                  <span class="icon is-small"><i class="fas fa-list-alt"></i></span>
                  <span>Carreras</span>
                </a>
              </li>
              <li className={`events ${this.state.eventsBoxIsVisible ? ' is-active' : ' ' }`}   onClick={this.clickEventsBox}>
                <a >
                  <span class="icon is-small"><i class="fas fa-calendar-alt"></i></span>
                  <span>Eventos</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="container has-background-white">
            <div className={`${(this.state.eventsBoxIsVisible) ? 'hidden-box' : 'show-box' }`}>
              {myCareersSelection}
              <ul>
                {myCareers.map((career) => (
                  <li>{career.name}</li>
                ))}
              </ul>
              <div class="field is-grouped">
                <p class="control">
                  <a class="button secondary" onClick={this.openModal}>
                    Registrar carrera
                  </a>
                </p>
                <p class="control">
                  <a class="button secondary">
                    Editar
                  </a>
                </p>
              </div>
            </div>
            <div className={`${(this.state.careersBoxIsVisible) ? 'hidden-box' : 'show-box' }`}>
              {eventType}
              
              <table className="table is-bordered is-striped">
                <thead>
                  <tr>
                    <th>Lugar</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th colspan="2" scope="colgroup">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr>
                      <td>{event.place}</td>
                      <td>{event.date}</td>
                      <td>{event.hour}</td>
                      <td>{button1}</td>
                      <td>{button2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </section>
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