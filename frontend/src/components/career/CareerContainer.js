import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const isProduction = process.env.NODE_ENV === 'production'
const baseURL = isProduction ? 'https://arcane-plateau-89806.herokuapp.com/api' : 'http://localhost:3000/api'

export default class CareerContainer extends Component {
  state = {
    careers: [],
    filtered:[]
  };

  componentDidMount() {
    axios
      .get(`${baseURL}/careers`)
      .then(({ data }) => {
        this.setState({ careers: [...data.careers] })
      })
      .catch((error) => {console.log(error)});
  }

  search = (e) => {
    const { value } = e.target;
    const { careers } = this.state;
    const query = value.toLowerCase();
    const filtered = careers.filter(
      (career) => career.name.toLowerCase().includes(query)
    );
    this.setState({ filtered });
  };

  render() {
    const { careers , filtered } = this.state;
    return (
      <div>
      <Navbar></Navbar>
      <div className="section">
        <nav className="panel">
        <p className="panel-heading">
          Carreras
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input onChange={this.search} className="input is-small" type="text" placeholder="search"/>
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
        {filtered.length === 0 &&
          careers.map((career) => (
            <p key={career._id} className="panel-block" onClick={() =>
              this.props.history.push(`/career/${career._id}`)
            }> 
            <span className="panel-icon">
              <i className="fas fa-book" aria-hidden="true"></i>
            </span>
            {career.name}
          </p>
        ))}
        {filtered.length !== 0 &&
          filtered.map((career) => (
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
      </div>
    );
  }
}
