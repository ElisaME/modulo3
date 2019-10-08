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
      })
      .catch((error) => {console.log(error)});
  }

  render() {
    const { careers } = this.state;
    return (
      <div className="section">
        <nav className="panel">
        <p className="panel-heading">
          Careers
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input is-small" type="text" placeholder="search"/>
            <span className="icon is-small is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        {/* <p className="panel-tabs">
          <span className="is-active">all</span>
          <span>Área 1</span>
          <span>Área 2</span>
          <span>Área 3</span>
          <span>Área 4</span>
        </p> */}
        {careers.map((career) => (
          <p key={career._id} className="panel-block" onClick={() =>
                  this.props.history.push(`/career/${career._id}`)
                }> 
            <span className="panel-icon">
              <i className="fas fa-book" aria-hidden="true"></i>
            </span>
            {career.name}
          </p>
        ))}
        </nav>
        
      </div>
    );
  }
}
