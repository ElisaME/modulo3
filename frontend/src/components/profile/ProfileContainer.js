import React, { Component } from 'react';
import { MyContext } from '../../context/index';
import AUTH_SERVICE from '../../services/auth';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
 

export default class Profile extends Component {
  
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      formIsHide:false,
      careers:[]
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

  componentDidMount() {
    if (!this.context.state.loggedUser) return this.props.history.push('/auth/login');
    AUTH_SERVICE.profile()
      .then((response) => {
        this.setState({careers:[...response.data.careers]})
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {careers} = this.state
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
              <a onClick={this.openModal} type="button">Registrar carrera</a>
            </div>
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
                <form>
                  <div class="field">
                    <label class="label">Carrera</label>
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select name="careerMentor">
                          <option>Select dropdown</option>
                          {careers.map((career) => (
                            <option key={career._id} value={career._id}>{career.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <p>¿No existe la carrera de la cual quieres ser mentor? Regístrala <span onClick={this.handleClick}>aquí.</span></p>
                  <div className="new-career" hidden = {!this.state.formIsHide}>
                    <h2 className="subtitle">Registro de carrera:</h2>
                    <form>
                      <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                          <input name="name" class="input" type="text" placeholder="Ingenieria Civil"/>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                          <textarea name="description" class="input" type="text"/>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Área</label>
                        <div class="control">
                          <input name="area" class="input" type="text" placeholder="Área I"/>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Ingreso Promedio</label>
                        <div class="control">
                          <input name="income" class="input" type="text" placeholder="$25,000 MXN"/>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Campo de trabajo</label>
                        <div class="control">
                          <input name="income" class="input" type="text" placeholder="Campos de aplicación..."/>
                        </div>
                      </div>
                      <div class="control">
                        <button type="submit" class="button secondary">Registrar Carrera</button>
                      </div>
                    </form>
                  </div>
                  <button type="submit" className="button secondary">Guardar</button>
                </form>
              </section>
            </div>
        </ReactModal>
        </div>
    )
  }                
}

Profile.contextType = MyContext;