import React, { Component } from 'react';
import axios from 'axios';

export default class CareerContainer extends Component {
  state = {
    careers: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/careers')
      .then(({ data }) => {
        this.setState({ careers: [...data.careers] })
        console.log(data)
      })
      .catch((error) => {console.log(error)});
  }

  render() {
    const { careers } = this.state;
    return (
      <div className="section">
        <nav class="panel">
        <p class="panel-heading">
          Careers
        </p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input is-small" type="text" placeholder="search"/>
            <span class="icon is-small is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p class="panel-tabs">
          <a class="is-active">all</a>
          <a>Área 1</a>
          <a>Área 2</a>
          <a>Área 3</a>
          <a>Área 4</a>
        </p>
        {careers.map((career) => (
          <a class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            {career.name}
          </a>
        ))}
        </nav>
        
      </div>
    );
  }
}
