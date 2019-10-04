import React, { Component } from 'react';
import { MyContext } from '../../context/index';
import AUTH_SERVICE from '../../services/auth';

function Form(props) {
  const category = props.category;
  if (category === 'Mentor') {
    return (
      <div>
        <div class="field">
          <label class="label">Biografía:</label>
          <div class="control">
            <textarea name="name" class="input" type="text" value={this.context.loggedUser.profile.biography}/>
          </div>
        </div>
        <div class="field">
          <label class="label">Título:</label>
          <div class="control">
            <textarea name="name" class="input" type="text" value={this.context.loggedUser.profile.degree}/>
          </div>
        </div>
      </div>
    )
  }
}

export default class EditProfile extends Component {

  componentDidMount() {
    if (!this.context.state.loggedUser) return this.props.history.push('/auth/login');
  }

  render() {
    return (
      <div>
        <p className="subtitle">
          Tu cuenta:
        </p>
        <form>
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="photo"/>
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span class="file-name">
                Screen Shot 2017-07-29 at 15.54.25.png
              </span>
            </label>
          </div>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input name="name" class="input" type="text" value={this.context.currentProfile.name}/>
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input name="email" class="input" type="email" value={this.context.loggedUser.email}/>
            </div>
          </div>
          <Form category={this.contex.loggedUser.category}/>
        </form>
      </div>
    )
  }
}

EditProfile.contextType = MyContext;