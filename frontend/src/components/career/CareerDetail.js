import React, { Component } from 'react';
import axios from 'axios';

export default class CareerDetail extends Component {
  state={
    career:{}
  }
  componentDidMount(){
    axios
    .get(`http://localhost:3000/api/career/${this.props.match.params.id}`)
    .then(({ data: { career }}) => this.setState({ career }))
    .catch((error) => {console.log(error)});
  }
  render() {
    const {career} = this.state
    return (
      <div>
        <p>Nombre: {career.name}</p>
        <p>Descripción: {career.description}</p>
        <p>Ingreso Promedio:{career.income}</p>
        <p>Área: {career.area}</p>
        <p>Campo de Trabajo: {career.field}</p>
      </div>
    )
  }
}
