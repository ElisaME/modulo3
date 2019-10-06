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
        <p>{career.name}</p>
        <p>{career.description}</p>
        <p>{career.income}</p>
        <p>{career.area}</p>
        <p>{career.field}</p>
      </div>
    )
  }
}
