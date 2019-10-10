import React, { Component } from 'react';
import { MyContext } from '../../context/index';
import AUTH_SERVICE from '../../services/auth';
import Navbar from '../Navbar';

export default class EditProfile extends Component {
  state = {
    user:{
      name:'',
      email:'',
      biography:'',
      degree:''
    }
  }

  handleInput = (e) => {
    const { user } = this.state;
    const key = e.target.name;
    user[key] = e.target.value;
    this.setState({ user });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.user)
    AUTH_SERVICE.editProfile(this.state.user)
      .then((response) => {
        console.log(response)
        this.props.history.push('/auth/profile')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (!this.context.state.loggedUser) return this.props.history.push('/auth/login');
    AUTH_SERVICE.profile()
      .then(({ data: { user }}) => this.setState({ user }))
      .catch(err => console.log(err))
  }

  render() {
    const {user} = this.state
    const category = this.context.state.loggedUser.category
    let fields;
    if (category === 'Mentor') {
      fields = <div>
            <div className="field">
          <label className="label">Biografía:</label>
          <div className="control">
            <textarea name="biography" onChange={this.handleInput} className="input" type="text" value={user.biography}/>
          </div>
        </div>
        <div className="field">
          <label className="label">Título:</label>
          <div className="control">
            <input name="degree" onChange={this.handleInput} className="input" type="text" value={user.degree}/>
          </div>
        </div>
      </div>
    } 
    return (
      <div>
      <Navbar></Navbar>
      <div className="section">
        <p className="subtitle">
          Tu cuenta:
        </p>
        <form onSubmit={this.onSubmit}>
          {/* <div className="file has-name">
            <label className="file-label">
              <input className="file-input" type="file" name="photo"/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
              <span className="file-name">
                Screen Shot 2017-07-29 at 15.54.25.png
              </span>
            </label>
          </div> */}
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input name="name" onChange={this.handleInput} className="input" type="text" value={user.name}/>
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input name="email" onChange={this.handleInput} className="input" type="email" value={user.email}/>
            </div>
          </div>
          {fields}
          <div className="field">
            <div className="control">
              <button type="submit" className="button secondary is-medium">Guardar</button>
            </div>
          </div>
        </form>
      </div>
      </div>
    )
  }
}

EditProfile.contextType = MyContext;